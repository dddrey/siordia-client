import LessonForm from "@/shared/components/forms/lesson/lesson";
import { LessonFormValues } from "@/schema/lesson.schema";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useCreateLesson } from "@/shared/hooks/use-lessons";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import LessonChoose from "@/shared/components/choose/lesson";
import { useSearchParams } from "react-router-dom";
import withAdmin from "@/shared/components/hoc/admin";
import useBackButton from "@/shared/hooks/use-backbutton";

const LessonCreateScreen = () => {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { mutate: createLesson, isPending, isError } = useCreateLesson();

  useBackButton({
    isOpen: true,
  });

  const handleSubmit = async (data: LessonFormValues) => {
    if (!topicId) return;

    const formData = new FormData();
    formData.append("topicId", topicId);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("about", data.about);
    formData.append(
      "isSubscriptionRequired",
      String(data.isSubscriptionRequired)
    );

    if (data.video instanceof File) {
      formData.append("video", data.video);
    }

    data.tasks.forEach((task, index) => {
      formData.append(`tasks[${index}]`, JSON.stringify(task));
    });

    createLesson(formData);
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
          description="Произошла ошибка при создании урока"
        />
      </ContentWrapper>
    );

  if (!topicId)
    return (
      <ContentWrapper
        className="flex flex-col justify-center"
        withFooter={false}
      >
        <LessonChoose />
      </ContentWrapper>
    );

  return (
    <ContentWrapper className="flex flex-col justify-center" withFooter={false}>
      <LessonForm onSubmit={handleSubmit}></LessonForm>
    </ContentWrapper>
  );
};

LessonCreateScreen.displayName = "LessonCreateScreen";

const WrappedLessonCreateScreen = withAdmin(LessonCreateScreen) as React.FC;
WrappedLessonCreateScreen.displayName = "WrappedLessonCreateScreen";

export default WrappedLessonCreateScreen;
