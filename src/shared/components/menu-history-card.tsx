import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHistoryCardStore } from "../store/use-history-card";
import useTelegram from "../hooks/use-telegram";
import { useUser } from "../hooks/use-user";

const MenuHistoryCard = ({ onClose }: { onClose: () => void }) => {
  const lesson = useHistoryCardStore((state) => state.lesson);
  const { data: user } = useUser();
  const { setHapticFeedback } = useTelegram();

  if (!lesson || user?.isAdmin) return null;

  return (
    <Link
      to={`/lesson/${lesson.id}`}
      onClick={() => {
        setHapticFeedback();
        onClose();
      }}
      className="flex items-center justify-between h-[100px] w-full rounded-lg border p-3 border-border max-w-[90%] mx-auto"
    >
      <div className="flex h-full justify-between flex-col">
        <div className="flex flex-col">
          <p className="text-textPrimary text-[12px]">{lesson.name}</p>
          <p className="text-gray-400 text-[10px]">Урок.</p>
        </div>
        <p className="text-[10px] text-gray-500">{lesson.about}</p>
      </div>
      <div>
        <div className=" rounded-full p-1.5 border border-border">
          <ChevronRight
            size={16}
            strokeWidth={2}
            className="text-textPrimary"
          />
        </div>
      </div>
    </Link>
  );
};

export default MenuHistoryCard;
