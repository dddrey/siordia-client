import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AdminSubscriptionFormValues,
  adminSubscriptionSchema,
} from "@/schema/admin-subscription.schema";
import FormField from "@/shared/components/ui/form-field";
import FormButton from "@/shared/components/ui/form-button";
import FormSelect from "@/shared/components/ui/form-select";
import { ContentType } from "@/shared/types/interfaces";

interface AdminSubscriptionFormProps {
  onSubmit: (data: AdminSubscriptionFormValues) => Promise<void>;
  isLoading?: boolean;
}

const AdminSubscriptionForm = ({
  onSubmit,
  isLoading = false,
}: AdminSubscriptionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<AdminSubscriptionFormValues>({
    resolver: zodResolver(adminSubscriptionSchema),
    defaultValues: {
      username: "",
      type: undefined,
      months: 1,
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: AdminSubscriptionFormValues) => {
    try {
      // Очищаем username от @ в начале если есть
      const cleanData = {
        ...data,
        username: data.username.startsWith("@")
          ? data.username.slice(1)
          : data.username,
      };

      await onSubmit(cleanData);
      reset(); // Сбрасываем форму после успешной отправки
    } catch (error) {
      console.error(error);
    }
  };

  const contentTypeOptions = [
    { value: ContentType.PLAYER, label: "Футболист" },
    { value: ContentType.COACH, label: "Тренер" },
    { value: ContentType.PARENT, label: "Родитель" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField<AdminSubscriptionFormValues>
          id="username"
          label="Никнейм пользователя"
          placeholder="@username или username"
          register={register}
          error={errors.username}
          required
          disabled={isLoading || isSubmitting}
        />

        <FormSelect<AdminSubscriptionFormValues>
          id="type"
          label="Тип подписки"
          options={contentTypeOptions}
          register={register}
          error={errors.type}
          placeholder="Выберите тип подписки"
          disabled={isLoading || isSubmitting}
          required
        />

        <FormField<AdminSubscriptionFormValues>
          id="months"
          label="Количество месяцев"
          type="number"
          placeholder="1"
          register={register}
          error={errors.months}
          required
          disabled={isLoading || isSubmitting}
          registerOptions={{
            min: { value: 1, message: "Минимум 1 месяц" },
            max: { value: 24, message: "Максимум 24 месяца" },
          }}
        />

        <FormButton
          type="submit"
          isLoading={isLoading || isSubmitting}
          variant="create"
          disabled={!isDirty || !isValid || isLoading || isSubmitting}
        >
          Выдать подписку
        </FormButton>
      </form>
    </div>
  );
};

export default AdminSubscriptionForm;
