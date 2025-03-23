import React from "react";
import Modal from "./ui/modal";
import { ContentType } from "../types/interfaces";
import { useSubscription } from "../hooks/use-subscription";
import useTelegram from "../hooks/use-telegram";

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

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { createPaymentLink, getActiveSubscription } = useSubscription();
  const { setHapticFeedback } = useTelegram();

  if (!type) return null;

  const { isActive, endDate } = getActiveSubscription(type);
  const title = getTypeTitle(type);
  const icon = getTypeIcon(type);

  const handleSubscribe = () => {
    setHapticFeedback();
    createPaymentLink(type);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${title} ${icon}`}
      className="w-[90%]"
    >
      <div className="flex flex-col gap-4">
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="text-xl font-bold gradient-text animate-gradient-xy-slow mb-2">
            Информация о подписке
          </h3>

          {isActive ? (
            <div className="bg-primary p-3 rounded-lg shadow-card-sm-light">
              <p className="text-green-600 font-medium">Подписка активна</p>
              <p className="text-sm">Действует до: {endDate}</p>
            </div>
          ) : (
            <div className="bg-primary p-3 rounded-lg shadow-card-sm-light">
              <p className="font-medium">
                Стоимость: <span className="gradient-text">5000 ₽</span>
              </p>
              <p className="text-sm">Длительность: 30 дней</p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 rounded-lg border border-border"
          >
            Отмена
          </button>
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-textPrimary text-white rounded-lg"
            disabled={isActive}
          >
            {isActive ? "Уже подключено" : "Подключить"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
