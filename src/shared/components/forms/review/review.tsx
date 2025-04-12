import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormButton from "@/shared/components/ui/form-button";
import {
  ReviewFormValues,
  reviewSchema,
  ReviewFileType,
} from "@/schema/review.schema";
import FileUpload from "@/shared/components/ui/file-upload";
import FormTextArea from "@/shared/components/ui/form-textarea";

interface ReviewFormProps {
  onSubmit: (data: ReviewFormValues) => Promise<void>;
  isLoading?: boolean;
}

const ReviewForm = ({ onSubmit, isLoading = false }: ReviewFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    mode: "onChange",
  });

  const file = watch("file");

  const handleFormSubmit = async (data: ReviewFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 mx-auto w-full max-w-[94%]"
    >
      <FormTextArea<ReviewFormValues>
        id="text"
        label="Текст вопроса"
        placeholder="Введите ваш вопрос"
        register={register}
        error={errors.text}
        required
        disabled={isLoading || isSubmitting}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Фото или видео</label>
        <div className="grid grid-cols-2 gap-4">
          {/* Загрузка изображения */}
          <FileUpload
            accept={ReviewFileType.IMAGE}
            value={undefined}
            onChange={(file) =>
              setValue(
                "file",
                { file, type: ReviewFileType.IMAGE },
                { shouldValidate: true }
              )
            }
            onRemove={() =>
              setValue("file", undefined, { shouldValidate: true })
            }
            disabled={
              isLoading || isSubmitting || file?.type === ReviewFileType.VIDEO
            }
          />

          {/* Загрузка видео */}
          <FileUpload
            accept={ReviewFileType.VIDEO}
            value={undefined}
            onChange={(file) =>
              setValue(
                "file",
                { file, type: ReviewFileType.VIDEO },
                { shouldValidate: true }
              )
            }
            onRemove={() =>
              setValue("file", undefined, { shouldValidate: true })
            }
            disabled={
              isLoading || isSubmitting || file?.type === ReviewFileType.IMAGE
            }
          />
        </div>
        {errors.file && (
          <p className="text-sm text-red-500 mt-1">{errors.file.message}</p>
        )}
      </div>

      <FormButton
        type="submit"
        isLoading={isLoading || isSubmitting}
        variant="update"
        disabled={!isDirty || !isValid || isLoading || isSubmitting}
        className="mt-4"
      >
        Отправить
      </FormButton>
    </form>
  );
};

export default ReviewForm;
