import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface UseBackButtonOptions {
  func?: () => void;
  isOpen?: boolean;
  loading?: boolean;
}

const useBackButton = ({ func, isOpen, loading }: UseBackButtonOptions) => {
  const backButton = window?.Telegram?.WebApp?.BackButton;
  const previousFuncRef = useRef<() => void>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (func && backButton) {
      if (previousFuncRef.current) {
        backButton.offClick(previousFuncRef.current);
      }
      backButton.onClick(func);
      previousFuncRef.current = func;

      return () => {
        if (previousFuncRef.current && backButton) {
          backButton.offClick(previousFuncRef.current);
        }
      };
    }
    if (!func && backButton) {
      backButton.onClick(() => navigate(-1));
    }
    return () => {
      if (backButton) {
        backButton.offClick(() => navigate(-1));
      }
    };
  }, [func, backButton, navigate]);

  useEffect(() => {
    if (backButton) {
      if (isOpen) {
        backButton.show();
      } else {
        backButton.hide();
      }
    }
  }, [isOpen, backButton]);

  return {
    show: () => backButton?.show(),
    hide: () => backButton?.hide(),
  };
};

export default useBackButton;
