import { LessonFormValues } from "@/schema/lesson.schema";
import FileUpload from "@/shared/components/ui/file-upload";
import VideoPlayer from "@/shared/components/video-player";
import { motion } from "framer-motion";
import {
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { FieldErrors } from "react-hook-form";

interface VideoViewProps {
  type: string;
  register: UseFormRegister<LessonFormValues>;
  setValue: UseFormSetValue<LessonFormValues>;
  watch: UseFormWatch<LessonFormValues>;
  clearErrors: UseFormClearErrors<LessonFormValues>;
  trigger: UseFormTrigger<LessonFormValues>;
  errors: FieldErrors<LessonFormValues>;
  isLoading: boolean;
  isSubmitting: boolean;
  lessonId?: string;
}

export const VideoView = ({
  type,
  setValue,
  watch,
  clearErrors,
  trigger,
  errors,
  isLoading,
  isSubmitting,
  lessonId,
}: VideoViewProps) => {
  if (type !== "video") return null;

  return (
    <motion.div
      key="video"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Видео урока
        </label>
        {lessonId && !watch("video") && <VideoPlayer videoId={lessonId} />}
        <FileUpload
          accept="video"
          onChange={(file) => {
            setValue("video", file, {
              shouldValidate: true,
              shouldDirty: true,
            });
            trigger("video");
          }}
          onRemove={async () => {
            setValue("video", "", {
              shouldValidate: false,
              shouldDirty: true,
            });
            clearErrors("video");
            await trigger("video");
          }}
          value={watch("video")}
          disabled={isLoading || isSubmitting}
        />
        {errors.video && (
          <p className="text-sm text-red-500">{errors.video.message}</p>
        )}
      </div>
    </motion.div>
  );
};
