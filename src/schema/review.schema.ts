import * as z from "zod";

// Определяем допустимые типы файлов
export enum ReviewFileType {
  IMAGE = "image",
  VIDEO = "video",
}

// Определяем тип для файла отзыва
export interface ReviewFile {
  file: File;
  type: ReviewFileType;
}

// Схема для файла
export const reviewSchema = z
  .object({
    text: z
      .string()
      .min(10, "Текст должен содержать минимум 10 символов")
      .max(500, "Текст не должен превышать 500 символов"),
    file: z
      .object({
        file: z.instanceof(File),
        type: z.nativeEnum(ReviewFileType),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Проверяем, что есть хотя бы текст или файл
      return data.text.length > 0 || data.file !== undefined;
    },
    {
      message: "Необходимо добавить текст или файл",
      path: ["text"],
    }
  );

export type ReviewFormValues = z.infer<typeof reviewSchema>;
