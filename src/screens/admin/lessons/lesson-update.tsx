import LessonForm from "@/shared/components/forms/lesson/lesson";
import { LessonFormValues } from "@/schema/lesson.schema";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useParams } from "react-router-dom";
import {
  useDeleteLesson,
  useLesson,
  useUpdateLesson,
} from "@/shared/hooks/use-lessons";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import FormButton from "@/shared/components/ui/form-button";
import withAdmin from "@/shared/components/hoc/admin";
import useBackButton from "@/shared/hooks/use-backbutton";
const LessonUpdateScreen = () => {
  const { id } = useParams();
  const { data: lesson, isLoading, error } = useLesson(id as string);
  const { mutate: updateLesson, isPending } = useUpdateLesson();
  useBackButton({
    isOpen: true,
  });
  const { mutate: deleteLesson, isPending: isPendingDelete } =
    useDeleteLesson();

  const handleSubmit = async (data: LessonFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("about", data.about);
    formData.append(
      "isSubscriptionRequired",
      String(data.isSubscriptionRequired)
    );

    // Если video это File, добавляем его в formData
    if (data.video instanceof File) {
      formData.append("video", data.video);
    } else if (typeof data.video === "string" && data.video) {
      // Если video это строка (videoId), добавляем его как есть
      formData.append("videoId", data.video);
    }

    data.tasks.forEach((task, index) => {
      formData.append(`tasks[${index}]`, JSON.stringify(task));
    });

    updateLesson({
      id: id as string,
      lesson: formData,
    });
  };

  const handleDelete = () => {
    deleteLesson(id as string);
  };

  if (isLoading || isPending || isPendingDelete) return <LoadingOverview />;

  if (error || !lesson)
    return (
      <ContentWrapper className="flex flex-col justify-center">
        <ErrorComponent
          code={500}
          title="Ошибка"
          description="Произошла ошибка при создании урока"
        />
      </ContentWrapper>
    );

  return (
    <ContentWrapper className="flex flex-col justify-center" withFooter={false}>
      <LessonForm
        onSubmit={handleSubmit}
        lesson={{
          name: lesson.lesson.name,
          description: lesson.lesson.description,
          about: lesson.lesson.about,
          video: lesson.lesson.videoId,
          tasks: lesson.lesson.tasks,
          isSubscriptionRequired: lesson.lesson.isSubscriptionRequired,
        }}
        lessonId={lesson.lesson.id}
      >
        <FormButton
          type="button"
          onClick={handleDelete}
          variant="delete"
          className="w-full"
        >
          Удалить урок
        </FormButton>
      </LessonForm>
    </ContentWrapper>
  );
};

LessonUpdateScreen.displayName = "LessonUpdateScreen";

const WrappedLessonUpdateScreen = withAdmin(LessonUpdateScreen) as React.FC;
WrappedLessonUpdateScreen.displayName = "WrappedLessonUpdateScreen";

export default WrappedLessonUpdateScreen;
