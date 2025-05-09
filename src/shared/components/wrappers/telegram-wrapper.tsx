import useTelegram from "@/shared/hooks/use-telegram";
import { useEffect } from "react";

export const TelegramWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { webAppState } = useTelegram();

  useEffect(() => {
    if (!webAppState) return;

    webAppState.ready();
    webAppState.expand();
    try {
      webAppState.disableVerticalSwipes();
      webAppState.requestFullscreen();
      webAppState.setBackgroundColor("#0C1E3C");
      webAppState.setHeaderColor("#0C1E3C");
      webAppState.lockOrientation();
    } catch (error) {
      console.log("err", error);
    }
  }, [webAppState]);

  return <div className="h-screen w-screen overflow-y-scroll">{children}</div>;
};
