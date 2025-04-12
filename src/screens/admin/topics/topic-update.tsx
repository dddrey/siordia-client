import TopicForm from "@/shared/components/forms/topic/topic";
import { TopicFormValues } from "@/schema/topic.schema";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import {
  useDeleteTopic,
  useTopic,
  useUpdateTopic,
} from "@/shared/hooks/use-topics";
import { useNavigate, useParams } from "react-router-dom";
import FormButton from "@/shared/components/ui/form-button";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import withAdmin from "@/shared/components/hoc/admin";
import useBackButton from "@/shared/hooks/use-backbutton";
const TopicUpdateScreen = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useTopic(id as string);
  const { mutate: updateTopic, isPending } = useUpdateTopic();
  const { mutate: deleteTopic, isPending: isPendingDelete } = useDeleteTopic();
  const navigate = useNavigate();
  useBackButton({
    isOpen: true,
  });

  const handleSubmit = async (data: TopicFormValues) => {
    updateTopic({
      id: id as string,
      topic: {
        name: data.name,
        description: data.description,
        about: data.about,
      },
    });
  };

  const handleDelete = () => {
    deleteTopic(id as string);
  };

  const handleTopics = () => {
    navigate(`/admin/lessons?topicId=${id}`);
  };

  const handleLessonCreate = () => {
    navigate(`/admin/lesson/create?topicId=${id}`);
  };

  if (isLoading || isPending || isPendingDelete) return <LoadingOverview />;

  if (error || !data)
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

  const { topic } = data;

  return (
    <ContentWrapper className="flex flex-col justify-center" withFooter={false}>
      <TopicForm onSubmit={handleSubmit} topic={topic}>
        <FormButton
          type="button"
          onClick={handleDelete}
          variant="delete"
          className="w-full"
        >
          Удалить тему
        </FormButton>
        <FormButton
          type="button"
          onClick={handleLessonCreate}
          variant="create"
          className="w-full"
        >
          Создать урок
        </FormButton>
        <FormButton
          type="button"
          onClick={handleTopics}
          variant="create"
          className="w-full"
        >
          Уроки темы
        </FormButton>
      </TopicForm>
    </ContentWrapper>
  );
};

TopicUpdateScreen.displayName = "TopicUpdateScreen";

const WrappedTopicUpdateScreen = withAdmin(TopicUpdateScreen) as React.FC;
WrappedTopicUpdateScreen.displayName = "WrappedTopicUpdateScreen";

export default WrappedTopicUpdateScreen;
