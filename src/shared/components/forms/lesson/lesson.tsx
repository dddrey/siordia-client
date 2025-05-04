import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { Fragment, useState, useEffect } from "react";
import { LessonFormValues, lessonSchema } from "@/schema/lesson.schema";
import { LessonButtons } from "./buttons";
import { LessonTasksView } from "./views/tasks";
import { VideoView } from "./views/video";
import { SettingsView } from "./views/settings";
import { PreviewModal } from "./preview-modal";
import { usePreviewModalStore } from "@/shared/store/use-preview-modal";
import FormButton from "@/shared/components/ui/form-button";
import useTelegram from "@/shared/hooks/use-telegram";

interface LessonFormProps {
  lessonId?: string;
  lesson?: LessonFormValues;
  onSubmit: (data: LessonFormValues) => Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
}

type FormView = "settings" | "tasks" | "video";

const LessonForm = ({
  lesson,
  onSubmit,
  isLoading = false,
  children,
  lessonId,
}: LessonFormProps) => {
  console.log("Initial lesson data:", lesson); // Проверяем начальные данные
  console.log("Initial tasks:", lesson?.tasks); // Проверяем начальные задачи

  const [view, setView] = useState<FormView>("settings");
  const { setHapticFeedback } = useTelegram();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    setValue,
    watch,
    clearErrors,
    trigger,
  } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: lesson?.name || "",
      description: lesson?.description || "",
      about: lesson?.about || "",
      video: "",
      tasks:
        lesson?.tasks?.map((task, index) => {
          return {
            name: task.name || "",
            description: task.description || "",
            index: task.index || index,
          };
        }) || [],
      isSubscriptionRequired: lesson?.isSubscriptionRequired ?? true,
    },
    mode: "onChange",
  });
  const { open } = usePreviewModalStore();

  // Добавим наблюдение за всей формой
  const formValues = watch();
  console.log("Current form values:", formValues);

  // Отдельно за tasks
  const tasks = watch("tasks");
  console.log("Current tasks:", tasks);

  useEffect(() => {
    // Если есть начальные данные, устанавливаем их принудительно
    if (lesson?.tasks?.length) {
      lesson.tasks.forEach((task, index) => {
        setValue(`tasks.${index}.name`, task.name);
        setValue(`tasks.${index}.description`, task.description);
        setValue(`tasks.${index}.index`, task.index || index);
      });
    }
  }, [lesson, setValue]);

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
      <LessonButtons
        view={view}
        handleViewChange={handleViewChange}
        handlePreviewClick={open}
      />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative flex flex-col gap-4 mx-auto w-full max-w-[94%] mt-safe-area pt-[30px] mb-[30px]"
      >
        <AnimatePresence mode="wait">
          <SettingsView
            type={view}
            register={register}
            watch={watch}
            errors={errors}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
          />
          <VideoView
            type={view}
            register={register}
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
            trigger={trigger}
            errors={errors}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            lessonId={lessonId}
          />
          <LessonTasksView
            register={register}
            control={control}
            errors={errors}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            type={view}
          />
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
      <PreviewModal
        name={watch("name") || ""}
        about={watch("about") || ""}
        description={watch("description") || ""}
        tasks={watch("tasks") || []}
        video={lessonId && !watch("video") ? lessonId : watch("video")}
      />
    </Fragment>
  );
};

export default LessonForm;
