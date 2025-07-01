import { useState } from "react";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import AuthNavigation from "./components/auth-navigation";
import FirstStep from "./components/first-step";
import FifthStep from "./components/fifth-step";
import ThirdStep from "./components/third-step";
import FourthStep from "./components/fourth-step";
import SecondStep from "./components/second-step";

const Auth = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep />;
      case 1:
        return <SecondStep />;
      case 2:
        return <ThirdStep />;
      case 3:
        return <FourthStep />;
      case 4:
        return <FifthStep />;
      default:
        return <FirstStep />;
    }
  };

  return (
    <ContentWrapper
      withFooter={false}
      withLayout={false}
      className="pt-safe-area flex flex-col items-center justify-center h-full"
    >
      <AuthNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onPrev={prevStep}
      />

      {renderCurrentStep()}
    </ContentWrapper>
  );
};

export default Auth;
