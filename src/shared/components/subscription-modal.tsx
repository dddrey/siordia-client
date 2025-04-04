import React from "react";
import Modal from "./ui/modal";
import { ContentType } from "../types/interfaces";
import { useSubscription } from "../hooks/use-subscription";
import useTelegram from "../hooks/use-telegram";
import { toast } from "react-hot-toast";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContentType | null;
}

const getTypeTitle = (type: ContentType | null): string => {
  switch (type) {
    case ContentType.COACH:
      return "Подписка на тренера";
    case ContentType.PLAYER:
      return "Подписка на игрока";
    case ContentType.PARENT:
      return "Подписка на родителя";
    default:
      return "Подписка";
  }
};

const getTypeIcon = (type: ContentType | null): string => {
  switch (type) {
    case ContentType.COACH:
      return "🧑‍🏫";
    case ContentType.PLAYER:
      return "🥇";
    case ContentType.PARENT:
      return "👩🏻‍🍼";
    default:
      return "📱";
  }
};

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
  const title = getTypeTitle(type);
  const icon = getTypeIcon(type);

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
      title={`${title} ${icon}`}
      className="w-[90%]"
    >
      <div className="flex flex-col gap-4">
        <div className="bg-primary p-4 rounded-lg">
          <h3 className="text-xl font-bold text-textPrimary mb-4">
            Информация о подписке
          </h3>

          {isActive ? (
            <div className="bg-primary text-textPrimary border border-border rounded-[12px] p-3">
              <p className="font-medium">Подписка активна</p>
              <p className="text-sm">Действует до: {endDate}</p>
            </div>
          ) : (
            <div className="bg-primary text-textPrimary border border-border rounded-[12px] p-3">
              <p className="font-medium">
                Стоимость: <span className="text-textPrimary">1200 ⭐</span>
              </p>
              <p className="text-sm">Длительность: 30 дней</p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            disabled={isLoading}
            onClick={onClose}
            className="px-4 py-2 mr-2 rounded-lg border text-textPrimary border-border"
          >
            Отмена
          </button>
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-textPrimary text-white rounded-lg min-w-[120px] h-[40px] flex justify-center items-center"
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
