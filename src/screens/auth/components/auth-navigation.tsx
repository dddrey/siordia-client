interface AuthNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

const AuthNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}: AuthNavigationProps) => {
  return (
    <>
      {/* Кнопка назад - фиксированная слева сверху */}
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className={`fixed top-6 left-6 z-10 px-4 py-2 rounded-lg font-medium ${
          currentStep === 0
            ? "hidden"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        ← Назад
      </button>

      {/* Кнопка вперед - фиксированная справа снизу */}
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className={`fixed bottom-6 right-6 z-10 px-6 py-3 rounded-lg font-medium ${
          currentStep === totalSteps - 1
            ? "hidden"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {currentStep === totalSteps - 1 ? "Готово" : "Далее →"}
      </button>
    </>
  );
};

export default AuthNavigation;
