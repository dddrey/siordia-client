import useTelegram from "@/shared/hooks/use-telegram";
import { ChevronRight } from "lucide-react";
import { Eye, Repeat2 } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ButtonsContainerProps {
  views: number;
  id: string;
  previousLessonId: string | null;
  nextLessonId: string | null;
}

const ButtonsContainer = ({
  views,
  id,
  previousLessonId,
  nextLessonId,
}: ButtonsContainerProps) => {
  const platform = window.Telegram?.WebApp?.platform;

  const isMobile = platform === "android" || platform === "ios";
  const navigate = useNavigate();
  const { setHapticFeedback } = useTelegram();

  const handlePrevClick = () => {
    if (!previousLessonId) return;
    setHapticFeedback();
    navigate(`/lesson/${previousLessonId}`);
  };

  const handleNextClick = () => {
    if (!nextLessonId) return;
    setHapticFeedback();
    navigate(`/lesson/${nextLessonId}`);
  };

  const handleReviewClick = () => {
    setHapticFeedback();
    navigate(`/review/${id}`);
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 mb-2 w-[88%] mx-auto font-medium ${
        isMobile ? "mt-4" : "pt-[52px]"
      }`}
    >
      <div
        className={`w-8 h-8 ${previousLessonId ? "opacity-100" : "opacity-0"} bg-primary text-textPrimary text-opacity-70 shadow-card-sm-light rounded-full flex items-center justify-center`}
      >
        <ChevronLeft size={14} onClick={handlePrevClick} />
      </div>
      <div className="h-8 rounded-md px-2 gap-2 text-[14px] bg-primary shadow-card-sm-light items-center flex">
        <div className="flex gap-1 items-center text-textPrimary">
          <Eye size={20} />
          <p>{views}</p>
        </div>
        <div
          className="flex gap-1 items-center text-textPrimary"
          onClick={handleReviewClick}
        >
          <Repeat2 size={20} />
          <p>Ревью тренера</p>
        </div>
      </div>
      <div>
        <div
          className={`w-8 h-8 ${nextLessonId ? "opacity-100" : "opacity-0"} bg-primary text-textPrimary text-opacity-70 shadow-card-sm-light rounded-full flex items-center justify-center`}
        >
          <ChevronRight size={14} onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
};

export default ButtonsContainer;
