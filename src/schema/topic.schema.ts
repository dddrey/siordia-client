import * as z from "zod"

export const topicSchema = z.object({
 name: z.string()
   .min(2, "Название должно содержать минимум 2 символа")
   .max(50, "Название не должно превышать 50 символов"),
 description: z.string()
   .min(10, "Описание должно содержать минимум 10 символов")
   .max(200, "Описание не должно превышать 200 символов"),
 about: z.string()
   .min(2, "Короткое описание должно содержать минимум 2 символа")
   .max(40, "Короткое описание не должно превышать 40 символов"),
})

export type TopicFormValues = z.infer<typeof topicSchema>