import FolderForm from "@/shared/components/forms/folder/folder";
import { FolderFormValues } from "@/schema/folder.schema";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import {
  useDeleteFolder,
  useFolder,
  useUpdateFolder,
} from "@/shared/hooks/use-folders";
import { useNavigate, useParams } from "react-router-dom";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import FormButton from "@/shared/components/ui/form-button";
import useBackButton from "@/shared/hooks/use-backbutton";
import { handleOpenAppLink } from "@/shared/utils/uri-links";

const FolderUpdateScreen = () => {
  const { id } = useParams();
  const { data: folder, isLoading, error } = useFolder(id as string);
  const { mutate: updateFolder, isPending } = useUpdateFolder();
  const { mutate: deleteFolder, isPending: isPendingDelete } =
    useDeleteFolder();
  const navigate = useNavigate();
  useBackButton({
    isOpen: true,
  });

  const handleSubmit = async (data: FolderFormValues) => {
    updateFolder({
      id: id as string,
      folder: {
        name: data.name,
        type: data.type,
        description: data.description,
        about: data.about,
      },
    });
  };

  const handleDelete = () => {
    deleteFolder(id as string);
  };

  const handleTopics = () => {
    navigate(`/admin/topics?folderId=${id}`);
  };

  const handleTopicCreate = () => {
    navigate(`/admin/topic/create?folderId=${id}`);
  };

  if (isLoading || isPending || isPendingDelete) return <LoadingOverview />;

  if (error || !folder)
    return (
      <ContentWrapper
        className="flex flex-col justify-center"
        withFooter={false}
      >
        <ErrorComponent
          code={500}
          title="Ошибка"
          description="Произошла ошибка при загрузке данных"
        />
      </ContentWrapper>
    );

  return (
    <ContentWrapper
      className="flex flex-col justify-center pt-safe-area"
      withFooter={false}
    >
      <FolderForm onSubmit={handleSubmit} folder={folder}>
        <FormButton
          type="button"
          onClick={handleDelete}
          variant="delete"
          className="w-full"
        >
          Удалить Папку
        </FormButton>
        <FormButton
          type="button"
          onClick={handleTopicCreate}
          variant="create"
          className="w-full"
        >
          Создать тему
        </FormButton>
        <FormButton
          type="button"
          onClick={handleTopics}
          variant="create"
          className="w-full"
        >
          Темы папки
        </FormButton>
        <FormButton
          type="button"
          onClick={() => handleOpenAppLink(`/topics/${id}`)}
          variant="create"
          className="w-full"
        >
          Открыть в приложении
        </FormButton>
      </FolderForm>
    </ContentWrapper>
  );
};

export default FolderUpdateScreen;
