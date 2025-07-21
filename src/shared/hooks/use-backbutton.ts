import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface UseBackButtonOptions {
  func?: () => void;
  isOpen?: boolean;
}

const useBackButton = ({ func, isOpen }: UseBackButtonOptions) => {
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
      const defaultBackHandler = () => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/");
        }
      };

      backButton.onClick(defaultBackHandler);
      previousFuncRef.current = defaultBackHandler;
    }
    return () => {
      if (backButton && previousFuncRef.current) {
        backButton.offClick(previousFuncRef.current);
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
