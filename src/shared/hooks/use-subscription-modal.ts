import { useState } from "react";
import { ContentType } from "../types/interfaces";

interface UseSubscriptionModalReturn {
  isOpen: boolean;
  selectedType: ContentType | null;
  openModal: (type: ContentType) => void;
  closeModal: () => void;
}

export const useSubscriptionModal = (): UseSubscriptionModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);

  const openModal = (type: ContentType) => {
    setSelectedType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Сбрасываем тип после закрытия с небольшой задержкой
    setTimeout(() => {
      setSelectedType(null);
    }, 300);
  };

  return {
    isOpen,
    selectedType,
    openModal,
    closeModal,
  };
};
