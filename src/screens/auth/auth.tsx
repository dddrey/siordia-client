import { useEffect } from "react";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import FirstStep from "./components/first-step";
import SecondStep from "./components/second-step";
import ThirdStep from "./components/third-step";
import { MainButtonProvider } from "@/shared/components/wrappers/main-button";
import {
  useAuthNavigation,
  useCurrentStep,
  useCanGoNext,
  useIsLoading,
  useIsLastStep,
} from "@/shared/hooks/use-auth-navigation";
import useBackButton from "@/shared/hooks/use-backbutton";
import { useUser, useUpdateUser } from "@/shared/hooks/use-user";

const Auth = () => {
  const currentStep = useCurrentStep();
  const canGoNext = useCanGoNext();
  const isLoading = useIsLoading();
  const isLastStep = useIsLastStep();
  const { nextStep, reset, prevStep } = useAuthNavigation();
  const { data: user } = useUser();
  const updateUser = useUpdateUser();

  useBackButton({
    func: prevStep,
    isOpen: currentStep > 0,
  });

  useEffect(() => {
    reset();
    return () => {
      reset();
    };
  }, [reset]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep />;
      case 1:
        return <SecondStep />;
      case 2:
        return <ThirdStep />;
      default:
        return <FirstStep />;
    }
  };

  const getButtonText = () => {
    if (isLastStep) {
      return user?.chatId ? "Продолжить" : "Подключить";
    }

    return "Далее";
  };

  const handleButtonClick = () => {
    if (isLastStep) {
      updateUser.mutate();
    } else {
      nextStep();
    }
  };

  // Для последнего шага кнопка всегда валидна, для остальных - используем canGoNext
  const isButtonValid = isLastStep ? true : canGoNext;

  return (
    <ContentWrapper
      withFooter={false}
      withLayout={false}
      className="pt-safe-area flex flex-col h-screen"
    >
      <MainButtonProvider
        isVisible={true}
        isLoading={isLoading || updateUser.isPending}
        variant="default"
        onClick={handleButtonClick}
        isValid={isButtonValid}
        isStatic={true}
        text={getButtonText()}
      >
        <div className="flex-1 flex flex-col items-center justify-center">
          {renderCurrentStep()}
        </div>
      </MainButtonProvider>
    </ContentWrapper>
  );
};

export default Auth;
