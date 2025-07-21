import { create } from "zustand";

interface AuthNavigationState {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  isLoading: boolean;
  // Добавляем состояние для второго шага
  currentSlide: number;
  totalSlides: number;

  // Методы навигации
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // Методы для валидации
  setStepValid: (isValid: boolean) => void;
  setLoading: (isLoading: boolean) => void;

  // Методы для работы со слайдами
  setCurrentSlide: (slide: number) => void;
  setTotalSlides: (total: number) => void;

  // Проверки
  canGoNext: () => boolean;
  canGoPrev: () => boolean;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  isLastSlide: () => boolean;

  // Сброс состояния
  reset: () => void;
}

export const useAuthNavigation = create<AuthNavigationState>((set, get) => ({
  currentStep: 0,
  totalSteps: 3,
  isStepValid: true,
  isLoading: false,
  currentSlide: 0,
  totalSlides: 0,

  nextStep: () => {
    const { currentStep, canGoNext } = get();
    if (canGoNext()) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep, canGoPrev } = get();
    if (canGoPrev()) {
      set({ currentStep: currentStep - 1 });
    }
  },

  goToStep: (step: number) => {
    const { totalSteps } = get();
    if (step >= 0 && step < totalSteps) {
      set({ currentStep: step });
    }
  },

  setStepValid: (isValid: boolean) => {
    set({ isStepValid: isValid });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setCurrentSlide: (slide: number) => {
    set({ currentSlide: slide });
  },

  setTotalSlides: (total: number) => {
    set({ totalSlides: total });
  },

  canGoNext: () => {
    const {
      currentStep,
      totalSteps,
      isStepValid,
      isLoading,
      currentSlide,
      totalSlides,
    } = get();

    // Для второго шага (индекс 1) проверяем, что мы на последнем слайде
    if (currentStep === 1) {
      return currentSlide === totalSlides - 1 && isStepValid && !isLoading;
    }

    return currentStep < totalSteps - 1 && isStepValid && !isLoading;
  },

  canGoPrev: () => {
    const { currentStep, isLoading } = get();
    return currentStep > 0 && !isLoading;
  },

  isFirstStep: () => {
    const { currentStep } = get();
    return currentStep === 0;
  },

  isLastStep: () => {
    const { currentStep, totalSteps } = get();
    return currentStep === totalSteps - 1;
  },

  isLastSlide: () => {
    const { currentSlide, totalSlides } = get();
    return currentSlide === totalSlides - 1;
  },

  reset: () => {
    set({
      currentStep: 0,
      isStepValid: true,
      isLoading: false,
      currentSlide: 0,
      totalSlides: 0,
    });
  },
}));

// Селекторы для оптимизации рендеринга
export const useCurrentStep = () =>
  useAuthNavigation((state) => state.currentStep);
export const useIsStepValid = () =>
  useAuthNavigation((state) => state.isStepValid);
export const useIsLoading = () => useAuthNavigation((state) => state.isLoading);
export const useCanGoNext = () =>
  useAuthNavigation((state) => state.canGoNext());
export const useCanGoPrev = () =>
  useAuthNavigation((state) => state.canGoPrev());
export const useIsFirstStep = () =>
  useAuthNavigation((state) => state.isFirstStep());
export const useIsLastStep = () =>
  useAuthNavigation((state) => state.isLastStep());
export const useCurrentSlide = () =>
  useAuthNavigation((state) => state.currentSlide);
export const useIsLastSlide = () =>
  useAuthNavigation((state) => state.isLastSlide());
