import { create } from "zustand";
import { ContentType } from "../types/interfaces";

interface SubscriptionModalState {
  isOpen: boolean;
  selectedType: ContentType | null;
  openModal: (type: ContentType) => void;
  closeModal: () => void;
}

export const useSubscriptionModal = create<SubscriptionModalState>((set) => ({
  isOpen: false,
  selectedType: null,
  openModal: (type: ContentType) => set({ isOpen: true, selectedType: type }),
  closeModal: () => {
    set({ isOpen: false });
    // Сбрасываем тип после закрытия с небольшой задержкой
    setTimeout(() => {
      set({ selectedType: null });
    }, 300);
  },
}));
