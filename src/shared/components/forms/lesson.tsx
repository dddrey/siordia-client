import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { Settings, ListTodo } from "lucide-react";
import FormField from "../ui/form-field";
import FormButton from "../ui/form-button";
import { LessonFormValues, lessonSchema } from "@/schema/lesson.schema";
import FormCheckbox from "../ui/form-checkbox";
import { useSidebarStore } from "../../store/use-sidebar-store";
import { useAdminSidebarStore } from "../../store/use-admin-sidebar-store";
import FormTaskList from "./task-list";
import useTelegram from "@/shared/hooks/use-telegram";

interface LessonFormProps {
  lesson?: LessonFormValues;
  onSubmit: (data: LessonFormValues) => Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
}

type FormView = "settings" | "tasks";

const LessonForm = ({
  lesson,
  onSubmit,
  isLoading = false,
  children,
}: LessonFormProps) => {
  const [view, setView] = useState<FormView>("settings");
  const { isOpen } = useSidebarStore();
  const { isOpen: isOpenAdmin } = useAdminSidebarStore();
  const { setHapticFeedback } = useTelegram();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: lesson?.name || "",
      description: lesson?.description || "",
      about: lesson?.about || "",
      video: lesson?.video || "",
      tasks: lesson?.tasks || [],
      isSubscriptionRequired: lesson?.isSubscriptionRequired || false,
    },
    mode: "onChange",
  });

  const handleViewChange = (view: FormView) => {
    setView(view);
    setHapticFeedback();
  };

  const handleFormSubmit = async (data: LessonFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div
        className={`flex items-center justify-center fixed gap-2 ${isOpen || isOpenAdmin ? " visible" : "z-[100]"} top-safe-area left-1/2 -translate-x-1/2 w-fit`}
      >
        <button
          type="button"
          onClick={() => handleViewChange("settings")}
          className={`p-3 rounded-md transition shadow-card-sm-light ${
            view === "settings"
              ? "bg-blue-500 text-white"
              : "text-gray-400 border border-border"
          }`}
        >
          <Settings size={20} />
        </button>
        <button
          type="button"
          onClick={() => handleViewChange("tasks")}
          className={`p-3 rounded-md transition shadow-card-sm-light ${
            view === "tasks"
              ? "bg-blue-500 text-white"
              : "text-gray-400 border border-border"
          }`}
        >
          <ListTodo size={20} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative flex flex-col gap-4 mx-auto w-full max-w-[94%]"
      >
        <AnimatePresence mode="wait">
          {view === "settings" ? (
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

              <FormField<LessonFormValues>
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

              <FormField<LessonFormValues>
                id="video"
                label="Видео"
                placeholder="Введите URL видео"
                register={register}
                error={errors.video}
                required
                disabled={isLoading || isSubmitting}
              />

              <FormCheckbox<LessonFormValues>
                id="isSubscriptionRequired"
                label="Требуется подписка"
                register={register}
                error={errors.isSubscriptionRequired}
                disabled={isLoading || isSubmitting}
              />
            </motion.div>
          ) : (
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
          )}
        </AnimatePresence>

        <FormButton
          type="submit"
          isLoading={isLoading || isSubmitting}
          variant={lesson ? "update" : "create"}
          disabled={!isDirty || !isValid || isLoading || isSubmitting}
          className="mt-4"
        >
          {lesson ? "Обновить урок" : "Создать урок"}
        </FormButton>
        {children}
      </form>
    </Fragment>
  );
};

export default LessonForm;
