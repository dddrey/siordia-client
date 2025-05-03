import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import TextContainer from "@/shared/components/text-container";
import LessonHeader from "@/shared/components/layout/lesson/header";
import ButtonsContainer from "@/shared/components/layout/lesson/buttons-container";
import TaskList from "@/shared/components/layout/lesson/task-list";
import { useLesson } from "@/shared/hooks/use-lessons";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingOverview from "@/shared/components/loading-overview";
import ErrorComponent from "@/shared/components/error";
import { useEffect } from "react";
import { ContentType } from "@/shared/types/interfaces";
import { useHistoryCardStore } from "@/shared/store/use-history-card";
import withAuth from "@/shared/components/hoc/auth";
import VideoPlayer from "@/shared/components/video-player";
import useBackButton from "@/shared/hooks/use-backbutton";
const LessonScreen = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as ContentType | undefined;
  const { data, isLoading, error } = useLesson(id as string, type);
  const { setLesson } = useHistoryCardStore();

  useBackButton({
    isOpen: true,
  });

  useEffect(() => {
    const lesson = data?.lesson;

    if (lesson?.id && lesson?.topicId) {
      setLesson(lesson);
    }
  }, [data]);

  if (isLoading) return <LoadingOverview />;

  if (error)
    return (
      <ContentWrapper className="flex flex-col justify-center">
        <ErrorComponent error={error} />
      </ContentWrapper>
    );

  if (!data) return null;

  const { lesson, previousLessonId, nextLessonId } = data;

  return (
    <ContentWrapper withFooter={false} className="pt-safe-area">
      <LessonHeader name={lesson.name} />
      <ButtonsContainer
        views={lesson.views}
        id={lesson.id}
        previousLessonId={previousLessonId}
        nextLessonId={nextLessonId}
      />
      <div className="w-[94%] mx-auto">
        <VideoPlayer videoId={lesson.id} />
      </div>
      {lesson.description && (
        <div className="w-[94%] mt-2 mx-auto rounded-[12px] p-3 bg-primary shadow-card-sm-light mb-1 flex flex-col items-center">
          <TextContainer
            className="w-full"
            title={
              <p className="text-textPrimary text-[16px] font-semibold">
                {lesson.name}
              </p>
            }
            text={lesson.description}
            textClassName="text-[13px]"
            isExpandedProp={true}
          />
        </div>
      )}
      {lesson.tasks && <TaskList tasks={lesson.tasks} />}
    </ContentWrapper>
  );
};

LessonScreen.displayName = "LessonScreen";

const WrappedLessonScreen = withAuth(LessonScreen) as React.FC;
WrappedLessonScreen.displayName = "WrappedLessonScreen";

export default WrappedLessonScreen;
