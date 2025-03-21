import useTelegram from "@/shared/hooks/use-telegram";
import { useEffect } from "react";
import BackButtonWrapper from "./backbutton-wrapper";
import { subscriptionsService } from "@/shared/services/subscription.service";

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
      subscriptionsService.getPaimenLink().then((link) => {
        webAppState.openInvoice(link.data.paymentUrl, (status) => {
          console.log("status", status);
        });
      });
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
