import useBackButton from "@/shared/hooks/use-backbutton";
import { useUser } from "@/shared/hooks/use-user";
import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  const { backButton, handleBack } = useBackButton();
  const { isLoading } = useUser();

  const pathname = useLocation();

  useEffect(() => {
    if (backButton) {
      if (isLoading) {
        backButton.hide();
        return;
      }
      if (pathname.pathname === "/") {
        backButton.hide();
        backButton.offClick(handleBack);
      } else {
        backButton.show();
        backButton.onClick(handleBack);
      }
    }
  }, [backButton, pathname, isLoading]);

  return <Fragment>{children}</Fragment>;
};

export default BackButtonWrapper;
