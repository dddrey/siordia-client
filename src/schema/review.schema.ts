import * as z from "zod"

// Определяем допустимые типы файлов
export enum ReviewFileType {
  IMAGE = 'image',
  VIDEO = 'video'
}

// Схема для файла
const fileSchema = z.object({
  type: z.nativeEnum(ReviewFileType),
  url: z.string().url("Некорректный URL файла"),
})

// Основная схема ревью
export const reviewSchema = z.object({
  text: z.string()
    .min(10, "Текст должен содержать минимум 10 символов")
    .max(500, "Текст не должен превышать 500 символов"),
  file: fileSchema.optional(),
}).refine((data) => {
  // Проверяем, что есть хотя бы текст или файл
  return data.text.length > 0 || data.file !== undefined;
}, {
  message: "Необходимо добавить текст или файл",
  path: ["text"], // Показываем ошибку в поле текста
});

export type ReviewFormValues = z.infer<typeof reviewSchema>

// Тип для файла
export type ReviewFile = z.infer<typeof fileSchema>
