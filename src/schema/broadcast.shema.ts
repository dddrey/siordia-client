import * as z from "zod";

export const broadcastSchema = z
  .object({
    text: z
      .string()
      .min(10, "Текст должен содержать минимум 10 символов")
      .max(4000, "Текст не должен превышать 4000 символов"),
    fileId: z
      .string()
      .refine((val) => {
        if (!val || val.trim() === "") return true; // Пустое значение разрешено
        // Telegram file ID обычно содержит буквы, цифры, дефисы и подчеркивания
        const telegramFileIdRegex = /^[A-Za-z0-9_-]+$/;
        return telegramFileIdRegex.test(val);
      }, "Введите корректный Telegram file ID")
      .optional()
      .or(z.literal("")),
    buttonText: z
      .string()
      .max(100, "Текст кнопки не должен превышать 100 символов")
      .optional()
      .or(z.literal("")),
    buttonUrl: z
      .string()
      .refine((val) => {
        if (!val || val.trim() === "") return true; // Пустое значение разрешено
        return val.startsWith("https://");
      }, "Ссылка должна начинаться с https://")
      .refine((val) => {
        if (!val || val.trim() === "") return true; // Пустое значение разрешено
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      }, "Введите корректную ссылку")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      // Если указан текст кнопки, то должна быть указана и ссылка
      if (data.buttonText && data.buttonText.trim() !== "") {
        return data.buttonUrl && data.buttonUrl.trim() !== "";
      }
      // Если указана ссылка, то должен быть указан и текст кнопки
      if (data.buttonUrl && data.buttonUrl.trim() !== "") {
        return data.buttonText && data.buttonText.trim() !== "";
      }
      return true;
    },
    {
      message: "Если указана кнопка, то нужно заполнить и текст, и ссылку",
      path: ["buttonText"], // Показываем ошибку на поле buttonText
    }
  );

export type BroadcastFormValues = z.infer<typeof broadcastSchema>;
