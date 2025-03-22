import useTelegram from "@/shared/hooks/use-telegram";
import BackButtonWrapper from "./backbutton-wrapper";
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
      webAppState.setBackgroundColor("#fff");
      webAppState.setHeaderColor("#fff");
      webAppState.lockOrientation();
    } catch (error) {
      console.log("err", error);
    }
  }, [webAppState]);

  return (
    <BackButtonWrapper>
      <div className="h-screen w-screen overflow-y-scroll">{children}</div>
    </BackButtonWrapper>
  );
};
