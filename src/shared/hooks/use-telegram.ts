import { webAppState } from "@/shared/types/telegram";
import { useEffect, useState, useCallback } from "react";

const useTelegram = () => {
  const [webAppState, setWebAppState] = useState<webAppState>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWebAppState(window.Telegram.WebApp);
    }
  }, []);

  const setHapticFeedback = useCallback(() => {
    if (webAppState) {
      webAppState.HapticFeedback.impactOccurred("medium");
    }
  }, [webAppState]);

  const openTelegramLinkFunc = useCallback(
    (url: string) => {
      if (webAppState) {
        webAppState.openLink(url, { try_instant_view: true });
      }
    },
    [webAppState]
  );

  const openInTelegramLinkFunc = useCallback(
    (url: string) => {
      if (webAppState) {
        webAppState.openTelegramLink(url);
      }
    },
    [webAppState]
  );

  function withHapticFeedback<T extends (...args: any[]) => any>(
    fn: T
  ): (...args: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>) => {
      setHapticFeedback();
      return fn(...args);
    };
  }

  return {
    webAppState,
    withHapticFeedback,
    setHapticFeedback,
    openTelegramLinkFunc,
    openInTelegramLinkFunc,
  };
};

export default useTelegram;
