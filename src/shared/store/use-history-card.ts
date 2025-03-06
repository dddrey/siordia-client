import { ILesson } from '@/types/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HistoryCardStore {
  lesson: ILesson<'preview' | 'full'> | null;
  setLesson: (lesson: ILesson<'preview' | 'full'>) => void;
  updateLesson: (updatedLesson: Partial<ILesson<'preview' | 'full'>>) => void;
  clearLesson: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useHistoryCardStore = create<HistoryCardStore>()(
  persist(
    (set) => ({
      isOpen: false,
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
      lesson: null,
      setLesson: (lesson) => set(() => ({ lesson })),
      updateLesson: (updatedLesson) =>
        set((state) => ({
          lesson: state.lesson ? { ...state.lesson, ...updatedLesson } : null,
        })),
      clearLesson: () => set(() => ({ lesson: null })),
    }),
    {
      name: 'history-card',
    }
  )
);
