import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FolderFormValues } from "@/schema/folder.schema";
import { folderSchema } from "@/schema/folder.schema";
import FormField from "@/shared/components/ui/form-field";
import FormButton from "@/shared/components/ui/form-button";
import FormSelect from "@/shared/components/ui/form-select";
import FormTextArea from "../../ui/form-textarea";

interface FolderFormProps {
  folder?: FolderFormValues;
  onSubmit: (data: FolderFormValues) => Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const FolderForm = ({
  folder,
  onSubmit,
  isLoading = false,
  children,
}: FolderFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FolderFormValues>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: folder?.name || "",
      description: folder?.description || "",
      about: folder?.about || "",
      type: folder?.type,
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: FolderFormValues) => {
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
      <FormField<FolderFormValues>
        id="name"
        label="Название"
        placeholder="Введите название папки"
        register={register}
        error={errors.name}
        required
        disabled={isLoading || isSubmitting}
      />
      <FormTextArea<FolderFormValues>
        id="description"
        label="Описание"
        placeholder="Введите описание"
        register={register}
        error={errors.description}
        required
        disabled={isLoading || isSubmitting}
        rows={10}
      />
      <FormField<FolderFormValues>
        id="about"
        label="Короткое описание"
        placeholder="Введите короткое описание"
        register={register}
        error={errors.about}
        required
        disabled={isLoading || isSubmitting}
      />
      <FormSelect<FolderFormValues>
        id="type"
        label="Тип"
        options={[
          { value: "player", label: "Футболист" },
          { value: "coach", label: "Тренер" },
          { value: "parent", label: "Родитель" },
        ]}
        register={register}
        error={errors.type}
        disabled={isLoading || isSubmitting}
      />

      <FormButton
        type="submit"
        isLoading={isLoading || isSubmitting}
        variant={folder ? "update" : "create"}
        disabled={!isDirty || !isValid || isLoading || isSubmitting}
      >
        {folder ? "Обновить папку" : "Создать папку"}
      </FormButton>
      {children}
    </form>
  );
};

export default FolderForm;
