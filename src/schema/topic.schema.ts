import * as z from "zod";

export const topicSchema = z.object({
  name: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(50, "Название не должно превышать 50 символов"),
  description: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов"),
  about: z
    .string()
    .min(2, "Короткое описание должно содержать минимум 2 символа"),
});

export type TopicFormValues = z.infer<typeof topicSchema>;
