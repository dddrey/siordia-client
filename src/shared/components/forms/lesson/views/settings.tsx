import { LessonFormValues } from "@/schema/lesson.schema";
import FormField from "@/shared/components/ui/form-field";
import FormCheckbox from "@/shared/components/ui/form-checkbox";
import { motion } from "framer-motion";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FieldErrors } from "react-hook-form";
import FormTextArea from "@/shared/components/ui/form-textarea";

interface SettingsViewProps {
  type: string;
  register: UseFormRegister<LessonFormValues>;
  watch: UseFormWatch<LessonFormValues>;
  errors: FieldErrors<LessonFormValues>;
  isLoading: boolean;
  isSubmitting: boolean;
}

export const SettingsView = ({
  type,
  register,
  watch,
  errors,
  isLoading,
  isSubmitting,
}: SettingsViewProps) => {
  if (type !== "settings") return null;

  return (
    <motion.div
      key="settings"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <FormField<LessonFormValues>
        id="name"
        label="Название"
        placeholder="Введите название урока"
        register={register}
        error={errors.name}
        required
        disabled={isLoading || isSubmitting}
      />

      <FormTextArea<LessonFormValues>
        id="description"
        label="Описание"
        placeholder="Введите описание"
        register={register}
        error={errors.description}
        required
        disabled={isLoading || isSubmitting}
      />

      <FormField<LessonFormValues>
        id="about"
        label="Короткое описание"
        placeholder="Введите короткое описание"
        register={register}
        error={errors.about}
        required
        disabled={isLoading || isSubmitting}
      />

      <FormCheckbox<LessonFormValues>
        id="isSubscriptionRequired"
        label="Требуется подписка"
        register={register}
        error={errors.isSubscriptionRequired}
        disabled={isLoading || isSubmitting}
        watch={watch}
      />
    </motion.div>
  );
};
