"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../ui/form-field";
import FormButton from "../ui/form-button";
import { TopicFormValues, topicSchema } from "@/schema/topic.schema";

interface TopicFormProps {
  topic?: TopicFormValues;
  onSubmit: (data: TopicFormValues) => Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const TopicForm = ({
  topic,
  onSubmit,
  isLoading = false,
  children,
}: TopicFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: topic?.name || "",
      description: topic?.description || "",
      about: topic?.about || "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: TopicFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-1 mx-auto w-full max-w-[94%]"
    >
      <FormField<TopicFormValues>
        id="name"
        label="Название"
        placeholder="Введите название папки"
        register={register}
        error={errors.name}
        required
        disabled={isLoading || isSubmitting}
      />
      <FormField<TopicFormValues>
        id="description"
        label="Описание"
        placeholder="Введите описание"
        register={register}
        error={errors.description}
        required
        disabled={isLoading || isSubmitting}
      />
      <FormField<TopicFormValues>
        id="about"
        label="Короткое описание"
        placeholder="Введите короткое описание"
        register={register}
        error={errors.about}
        required
        disabled={isLoading || isSubmitting}
      />

      <FormButton
        type="submit"
        isLoading={isLoading || isSubmitting}
        variant={topic ? "update" : "create"}
        disabled={!isDirty || !isValid || isLoading || isSubmitting}
      >
        {topic ? "Обновить тему" : "Создать тему"}
      </FormButton>
      {children}
    </form>
  );
};

export default TopicForm;
