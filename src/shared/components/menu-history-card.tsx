import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHistoryCardStore } from "../store/use-history-card";
import useTelegram from "../hooks/use-telegram";
import { useUser } from "../hooks/use-user";
interface MenuHistoryCardProps {
  title: string;
  subtitle: string;
  description: string;
  onClose: () => void;
}

const MenuHistoryCard = ({
  title,
  subtitle,
  description,
  onClose,
}: MenuHistoryCardProps) => {
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
          <p className="text-textPrimary text-[10px]">{title}</p>
          <p className="text-[8px] text-gray-400">{subtitle}</p>
        </div>
        <p className="text-[10px] text-gray-500">{description}</p>
      </div>
      <div>
        <div className="bg-secondary text-black text-opacity-30 rounded-full p-2 border border-border">
          <ChevronRight size={16} strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
};

export default MenuHistoryCard;
