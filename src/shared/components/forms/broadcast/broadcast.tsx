import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { BroadcastFormValues, broadcastSchema } from "@/schema/broadcast.shema";
import FormTextArea from "@/shared/components/ui/form-textarea";
import FormButton from "@/shared/components/ui/form-button";
import FormField from "../../ui/form-field";
import { Broadcast } from "@/shared/types/interfaces";

interface BroadcastFormProps {
  broadcast?: Broadcast;
  onSubmit: (data: BroadcastFormValues) => Promise<void>;
  handleTestBroadcast: (data: BroadcastFormValues) => Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
  title: string;
}

const BroadcastForm = ({
  broadcast,
  onSubmit,
  handleTestBroadcast,
  isLoading = false,
  children,
  title,
}: BroadcastFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    getValues,
  } = useForm<BroadcastFormValues>({
    resolver: zodResolver(broadcastSchema),
    defaultValues: {
      text: broadcast?.text || "",
      imageUrl: broadcast?.imageUrl || "",
      buttonText: broadcast?.buttonText || "",
      buttonUrl: broadcast?.buttonUrl || "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: BroadcastFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative flex flex-col gap-2 mx-auto w-full max-w-[94%] mt-safe-area pt-[30px] mb-[30px]"
      >
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-border mb-4">{title}</h2>

          <FormTextArea
            id="text"
            label="Текст сообщения"
            placeholder="Введите текст для рассылки..."
            register={register}
            error={errors.text}
            required
            rows={6}
            disabled={isLoading || isSubmitting}
          />

          <FormField<BroadcastFormValues>
            id="imageUrl"
            label="Ссылка на картинку (необязательно)"
            placeholder="https://example.com/image.jpg"
            register={register}
            error={errors.imageUrl}
            disabled={isLoading || isSubmitting}
          />

          <FormField<BroadcastFormValues>
            id="buttonText"
            label="Текст кнопки (необязательно)"
            placeholder="Например: Перейти к статье"
            register={register}
            error={errors.buttonText}
            disabled={isLoading || isSubmitting}
          />

          <FormField<BroadcastFormValues>
            id="buttonUrl"
            label="Ссылка кнопки (необязательно)"
            placeholder="https://example.com"
            register={register}
            error={errors.buttonUrl}
            disabled={isLoading || isSubmitting}
          />
        </div>

        <FormButton
          type="submit"
          isLoading={isLoading || isSubmitting}
          variant={broadcast ? "update" : "create"}
          disabled={!isDirty || !isValid || isLoading || isSubmitting}
          className="mt-4"
        >
          {broadcast ? "Обновить рассылку" : "Создать рассылку"}
        </FormButton>
        <FormButton
          type="button"
          variant="create"
          disabled={!isValid || isLoading || isSubmitting}
          className="w-full"
          onClick={() => handleTestBroadcast(getValues())}
        >
          Проверить рассылку
        </FormButton>
        {children}
      </form>
    </Fragment>
  );
};

export default BroadcastForm;
