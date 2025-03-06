import { useEffect, useState } from "react";
import { backButtonState } from "../types/telegram";
import { useNavigate } from "react-router-dom";
const useBackButton = () => {
  const [backButton, setBackButton] = useState<backButtonState>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBackButton(window.Telegram.WebApp.BackButton);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return {
    backButton,
    handleBack,
  };
};

export default useBackButton;
