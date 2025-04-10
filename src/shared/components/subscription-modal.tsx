import React from "react";
import Modal from "./ui/modal";
import { ContentType } from "../types/interfaces";
import { useSubscription } from "../hooks/use-subscription";
import useTelegram from "../hooks/use-telegram";
import { toast } from "react-hot-toast";
import { StarIcon } from "./ui/icons/star";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContentType | null;
}

// Упрощенный спиннер
const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { createPaymentLink, getActiveSubscription, isLoading } =
    useSubscription();
  const { setHapticFeedback } = useTelegram();

  if (!type) return null;

  const { isActive, endDate } = getActiveSubscription(type);

  const handleSubscribe = async () => {
    if (isLoading) return;
    setHapticFeedback();
    try {
      await createPaymentLink(type);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при подключении подписки");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Информация о подписке`}
      className="w-[90%] max-w-md"
    >
      <div className="flex flex-col gap-[80px]">
        <div className="rounded-2xl flex items-center justify-between">
          {isActive ? (
            <div className="rounded-xl">
              <p className="font-semibold text-[18px] text-textAccent">
                Подписка активна
              </p>
              <p className="text-[12px] ml-[2px] text-textSecondary">
                Действует до: {endDate}
              </p>
            </div>
          ) : (
            <div className="rounded-xl">
              <p className="font-semibold text-[18px] text-textAccent">
                Купить подписку
              </p>
              <p className="text-[12px] ml-[2px] text-textSecondary">
                Длительность: 30 дней
              </p>
            </div>
          )}
          <p className="font-semibold text-[18px] flex items-center gap-1 text-textAccent">
            <span className="text-textAccent">1200</span>
            <StarIcon size={16} color="#00D26A" strokeColor="#00D26A" />
          </p>
        </div>

        <div className="flex justify-end gap-1 mt-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-textPrimary"
            disabled={isLoading}
          >
            Отмена
          </button>
          <button
            onClick={handleSubscribe}
            className="px-6 py-2.5 bg-textAccent text-textPrimary rounded-xl min-w-[120px] flex justify-center items-center"
            disabled={isLoading}
          >
            {isActive ? "Продлить" : isLoading ? <Spinner /> : "Подключить"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
