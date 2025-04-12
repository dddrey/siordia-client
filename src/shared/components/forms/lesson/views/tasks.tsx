import { motion } from "framer-motion";
import { UseFormRegister } from "react-hook-form";
import { Control } from "react-hook-form";
import { FieldErrors } from "react-hook-form";
import { LessonFormValues } from "@/schema/lesson.schema";
import FormTaskList from "@/shared/components/forms/lesson/task-list";

interface LessonTasksViewProps {
  register: UseFormRegister<LessonFormValues>;
  control: Control<LessonFormValues>;
  errors: FieldErrors<LessonFormValues>;
  isLoading: boolean;
  isSubmitting: boolean;
  type: "settings" | "tasks" | "video";
}

export const LessonTasksView = ({
  register,
  control,
  errors,
  isLoading,
  isSubmitting,
  type,
}: LessonTasksViewProps) => {
  if (type !== "tasks") return null;

  return (
    <motion.div
      key="tasks"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <FormTaskList
        register={register}
        control={control}
        errors={errors}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
      />
    </motion.div>
  );
};
