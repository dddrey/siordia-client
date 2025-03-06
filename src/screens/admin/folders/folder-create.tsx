import FolderForm from "@/shared/components/forms/folder";
import { FolderFormValues } from "@/schema/folder.schema";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useCreateFolder } from "@/shared/hooks/use-folders";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import withAdmin from "@/shared/components/hoc/admin";

const FolderCreateScreen = () => {
  const { mutate: createFolder, isPending, isError } = useCreateFolder();

  const handleSubmit = async (data: FolderFormValues) => {
    createFolder({
      name: data.name,
      type: data.type,
      description: data.description,
      about: data.about,
    });
  };

  if (isPending) return <LoadingOverview />;

  if (isError)
    return (
      <ContentWrapper
        className="flex flex-col justify-center"
        withFooter={false}
      >
        <ErrorComponent
          code={500}
          title="Ошибка"
          description="Произошла ошибка при создании папки"
        />
      </ContentWrapper>
    );

  return (
    <ContentWrapper className="flex flex-col justify-center" withFooter={false}>
      <FolderForm onSubmit={handleSubmit} />
    </ContentWrapper>
  );
};

FolderCreateScreen.displayName = "FolderCreateScreen";

const WrappedFolderCreateScreen = withAdmin(FolderCreateScreen) as React.FC;
WrappedFolderCreateScreen.displayName = "WrappedFolderCreateScreen";

export default WrappedFolderCreateScreen;
