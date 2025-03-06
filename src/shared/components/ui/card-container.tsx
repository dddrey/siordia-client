import React from "react";

export const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-lg bg-white p-4">{children}</div>;
};

CardContainer.displayName = "CardContainer";

export default CardContainer;
