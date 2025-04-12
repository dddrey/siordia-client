import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { LessonFormValues, lessonSchema } from "@/schema/lesson.schema";
import { LessonButtons } from "./buttons";
import { LessonTasksView } from "./views/tasks";
import { VideoView } from "./views/video";
import { SettingsView } from "./views/settings";
import FormButton from "@/shared/components/ui/form-button";
import useTelegram from "@/shared/hooks/use-telegram";
import { PreviewModal } from "./preview-modal";
import { usePreviewModalStore } from "@/shared/store/use-preview-modal";
import useBackButton from "@/shared/hooks/use-backbutton";
import { useNavigate } from "react-router-dom";

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
  const [view, setView] = useState<FormView>("settings");
  const { setHapticFeedback } = useTelegram();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
      tasks: lesson?.tasks || [],
      isSubscriptionRequired: lesson?.isSubscriptionRequired ?? true,
    },
    mode: "onChange",
  });
  const { open } = usePreviewModalStore();

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
        description={watch("description") || ""}
        tasks={watch("tasks") || []}
        video={lessonId && !watch("video") ? lessonId : watch("video")}
      />
    </Fragment>
  );
};

export default LessonForm;
