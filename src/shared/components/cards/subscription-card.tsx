import { ChevronRight, StarIcon } from "lucide-react";
import { FC } from "react";
import { ContentType } from "../../types/interfaces";
import { useSubscription } from "@/shared/hooks/use-subscription";
import useTelegram from "@/shared/hooks/use-telegram";

interface SubscriptionCardProps {
  title: string;
  price: number;
  duration: string;
  type: ContentType;
  icon: React.ReactNode;
  onOpenModal: (type: ContentType) => void;
  isSoon?: boolean;
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  title,
  price,
  duration,
  type,
  icon,
  onOpenModal,
  isSoon,
}) => {
  const { getActiveSubscription } = useSubscription();
  const { setHapticFeedback } = useTelegram();
  const { isActive, endDate } = getActiveSubscription(type);

  const handleClick = () => {
    if (isSoon) return;
    setHapticFeedback();
    onOpenModal(type);
  };

  return (
    <div
      className={`p-3 h-[25vh] rounded-lg flex flex-col justify-between bg-primary text-textPrimary shadow-card-light relative ${
        isSoon ? "opacity-50" : ""
      }`}
    >
      <div className="mb-4 w-full flex justify-between items-start">
        <div className="text-[18px] font-semibold flex gap-2 items-center">
          <div className="flex items-center gap-1 bg-textAccent rounded-[10px] p-2">
            {icon}
          </div>
          <div className="flex flex-col text-textAccent">
            <p className="text-[19px] font-semibold">{title}</p>
            <p className="text-[17px] font-medium text-textSecondary">
              {isActive ? `${endDate}` : duration}
            </p>
          </div>
        </div>
        <div className="w-fit gap-1 flex items-center">
          <p className="text-[22px] font-semibold text-textAccent">
            {isSoon ? "скоро" : price.toLocaleString()}
          </p>
          <div>
            {!isSoon && (
              <StarIcon
                className="w-[22px] h-[22px]"
                color="#00D26A"
                fill="#00D26A"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-end justify-end">
        {!isSoon && (
          <button
            onClick={handleClick}
            className="text-[16px] bg-primary self-end p-[10px] text-textAccent rounded-full border border-border"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        )}
      </div>
      {isSoon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-textAccent bg-primary/80 px-4 py-2 rounded-lg">
            Скоро появится
          </span>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
