import TopicForm from "@/shared/components/forms/topic/topic";
import { TopicFormValues } from "@/schema/topic.schema";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useCreateTopic } from "@/shared/hooks/use-topics";
import { useSearchParams } from "react-router-dom";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import TopicChoose from "@/shared/components/choose/topic";
import useBackButton from "@/shared/hooks/use-backbutton";

const TopicCreateScreen = () => {
  const [searchParams] = useSearchParams();
  const folderId = searchParams.get("folderId");
  useBackButton({
    isOpen: true,
  });

  const { mutate: createTopic, isPending, isError } = useCreateTopic();

  const handleSubmit = async (data: TopicFormValues) => {
    if (!folderId) return;
    createTopic({
      folderId: folderId,
      data: data,
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
          description="Произошла ошибка при создании темы"
        />
      </ContentWrapper>
    );

  if (!folderId)
    return (
      <ContentWrapper
        className="flex flex-col justify-center"
        withFooter={false}
      >
        <TopicChoose />
      </ContentWrapper>
    );

  return (
    <ContentWrapper className="flex flex-col justify-center" withFooter={false}>
      <TopicForm onSubmit={handleSubmit}></TopicForm>
    </ContentWrapper>
  );
};

export default TopicCreateScreen;
