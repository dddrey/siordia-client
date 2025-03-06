import { motion } from "framer-motion";
import Avatar from "./ui/avatar";
import { ChevronRight } from "lucide-react";
import { useHistoryCardStore } from "../store/use-history-card";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/use-user";

const HistoryCard = () => {
  const { lesson } = useHistoryCardStore();
  const { data: user } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    if (lesson) navigate(`/lesson/${lesson.id}`);
  };

  if (!lesson || user?.isAdmin) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      }}
      className="border-secondary max-w-[80%] ml-5 shadow-card-sm-light z-10 h-[50px] bg-primary w-full py-2 px-3 rounded-[12px] flex items-center gap-2"
      onClick={handleClick}
    >
      <Avatar size="small" className="border border-border" />
      <div className="flex flex-1 flex-col justify-start items-start">
        <p className="text-textPrimary text-[14px]">{lesson.name}</p>
        <p className="text-gray-400 text-[10px]">Урок {lesson.number}.</p>
      </div>
      <div className="flex items-center justify-center bg-secondary text-black text-opacity-30 rounded-full p-2 border border-border">
        <ChevronRight size={16} strokeWidth={2} />
      </div>
    </motion.div>
  );
};

export default HistoryCard;
