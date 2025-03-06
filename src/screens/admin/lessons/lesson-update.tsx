"use client";

import LessonForm from "@/shared/components/forms/lesson";
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

const LessonUpdateScreen = () => {
  const { id } = useParams();
  const { data: lesson, isLoading, error } = useLesson(id as string);
  const { mutate: updateLesson, isPending } = useUpdateLesson();
  const { mutate: deleteLesson, isPending: isPendingDelete } =
    useDeleteLesson();

  const handleSubmit = async (data: LessonFormValues) => {
    updateLesson({
      id: id as string,
      lesson: data,
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
      <LessonForm onSubmit={handleSubmit} lesson={lesson.lesson}>
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
