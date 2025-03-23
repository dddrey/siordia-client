import { ChevronRight } from "lucide-react";
import { FC } from "react";
import { ContentType } from "../../types/interfaces";
import { useSubscription } from "@/shared/hooks/use-subscription";
import useTelegram from "@/shared/hooks/use-telegram";

interface SubscriptionCardProps {
  title: string;
  price: number;
  duration: string;
  type: ContentType;
  icon: string;
  onOpenModal: (type: ContentType) => void;
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  title,
  price,
  duration,
  type,
  icon,
  onOpenModal,
}) => {
  const { getActiveSubscription } = useSubscription();
  const { setHapticFeedback } = useTelegram();
  const { isActive, endDate } = getActiveSubscription(type);

  const handleClick = () => {
    setHapticFeedback();
    onOpenModal(type);
  };

  return (
    <div className="p-3 h-[25vh] rounded-lg flex flex-col justify-between bg-primary text-textPrimary shadow-card-light">
      <div className="mb-4 w-full flex justify-between items-center">
        <p className="text-[20px] font-semibold ">
          <span className="gradient-text">{title}</span>
          <span>{icon}</span>
        </p>
        <p className="text-[17px] font-semibold text-textPrimary">
          {isActive ? `${endDate}` : duration}
        </p>
      </div>
      <div className="flex w-full items-end">
        <div className="flex w-full items-end gap-1">
          <p className="text-[24px] font-bold gradient-text animate-gradient-xy-slow">
            {price.toLocaleString()} ₽
          </p>
        </div>
        <button
          onClick={handleClick}
          className="text-[16px] bg-textPrimary p-[10px] text-white rounded-full border border-border"
        >
          <ChevronRight color="white" size={18} strokeWidth={1.2} />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
