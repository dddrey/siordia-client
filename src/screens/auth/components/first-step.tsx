import { useEffect } from "react";
import { useAuthNavigation } from "@/shared/hooks/use-auth-navigation";

const FirstStep = () => {
  const { setStepValid } = useAuthNavigation();

  // Устанавливаем валидность шага при монтировании
  useEffect(() => {
    setStepValid(true);
  }, [setStepValid]);

  return (
    <div className="flex flex-col h-full px-4 mt-2">
      <p className="text-5xl font-semibold text-textAccent mb-2">
        Добро пожаловать в Kickstart Go!
      </p>
      <p className="text-xl text-textSecondary">
        Приложение для футбольных тренеровок
      </p>
    </div>
  );
};

export default FirstStep;
