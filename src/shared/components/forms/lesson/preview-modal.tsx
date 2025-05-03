import { usePreviewModalStore } from "@/shared/store/use-preview-modal";
import LessonHeader from "../../layout/lesson/header";
import TaskList from "../../layout/lesson/task-list";
import TextContainer from "../../text-container";
import VideoPlayer from "../../video-player";
import FormButton from "../../ui/form-button";

interface Task {
  name: string;
  description: string;
}

interface PreviewModalProps {
  name: string;
  description: string;
  about: string;
  tasks: Task[];
  video: string | File;
}

export const PreviewModal = ({
  name,
  description,
  tasks,
  about,
  video,
}: PreviewModalProps) => {
  const { isOpen, close } = usePreviewModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed w-full max-w-[500px] h-screen bg-secondary flex flex-col gap-4 z-[1000] pt-safe-area">
      <div className="w-[94%] mx-auto" onClick={close} />

      <div className="w-[94%] mx-auto aspect-video">
        {video ? (
          <VideoPlayer
            file={video instanceof File ? video : undefined}
            videoId={typeof video === "string" ? video : undefined}
          />
        ) : null}
      </div>

      <LessonHeader name={name} />
      <div className="w-[94%] mx-auto">
        <p className="text-textPrimary text-[14px] font-medium ml-1 text-center">
          {about || ""}
        </p>
      </div>
      {description && (
        <div className="w-[94%] mt-2 mx-auto rounded-[12px] p-3 bg-primary shadow-card-sm-light mb-1 flex flex-col items-center">
          <TextContainer
            className="w-full"
            title={
              <p className="text-textPrimary text-[16px] font-semibold">
                {name}
              </p>
            }
            text={description}
            textClassName="text-[13px]"
            isExpandedProp={true}
          />
        </div>
      )}
      {tasks && <TaskList tasks={tasks} />}
      <div
        className="w-[94%] max-w-[500px] mx-auto flex justify-center h-10 fixed bottom-5 left-0 right-0 bg-primary"
        onClick={close}
      >
        <FormButton type="button" className="w-full">
          Закрыть
        </FormButton>
      </div>
    </div>
  );
};
