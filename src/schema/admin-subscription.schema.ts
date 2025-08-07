import { ContentType } from "@/shared/types/interfaces";
import * as z from "zod";

export const adminSubscriptionSchema = z.object({
  username: z
    .string()
    .min(1, "Введите никнейм пользователя")
    .max(50, "Никнейм не должен превышать 50 символов")
    .refine((val) => {
      // Удаляем @ в начале если есть
      const cleanUsername = val.startsWith("@") ? val.slice(1) : val;
      // Проверяем что никнейм содержит только допустимые символы
      const usernameRegex = /^[a-zA-Z0-9_]{1,32}$/;
      return usernameRegex.test(cleanUsername);
    }, "Никнейм может содержать только буквы, цифры и подчеркивания"),
  type: z.nativeEnum(ContentType, {
    errorMap: () => ({ message: "Выберите тип подписки" }),
  }),
  months: z.preprocess(
    (val) => {
      // Преобразуем строку в число если это строка
      if (typeof val === "string") {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? val : parsed;
      }
      return val;
    },
    z
      .number({
        required_error: "Введите количество месяцев",
        invalid_type_error: "Количество месяцев должно быть числом",
      })
      .min(1, "Минимум 1 месяц")
      .max(24, "Максимум 24 месяца")
      .int("Количество месяцев должно быть целым числом")
  ),
});

export type AdminSubscriptionFormValues = z.infer<
  typeof adminSubscriptionSchema
>;
