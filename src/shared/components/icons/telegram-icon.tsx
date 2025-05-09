import React from "react";
import { cn } from "../../utils/cn";
import useTelegram from "@/shared/hooks/use-telegram";

interface TelegramIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

const TelegramIcon = ({
  width = 40,
  height = 40,
  ...props
}: TelegramIconProps) => {
  const { setHapticFeedback, openInTelegramLinkFunc } = useTelegram();

  const handleClick = () => {
    setHapticFeedback();
    openInTelegramLinkFunc("https://t.me/coach_siordia");
  };

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      className={cn(props.className, "cursor-pointer")}
      {...props}
    >
      <path
        fill={props.color}
        fillRule="evenodd"
        d="M23.112 4.494c.318-1.55-1.205-2.837-2.68-2.267L2.342 9.216c-1.647.637-1.72 2.941-.117 3.682l3.94 1.818 1.873 6.559a1 1 0 0 0 1.67.432l2.886-2.887 4.043 3.033a2 2 0 0 0 3.16-1.198l3.315-16.16ZM3.063 11.082l18.09-6.99-3.316 16.161L13.1 16.7a1 1 0 0 0-1.307.093l-1.236 1.236.371-2.043 7.28-7.279a1 1 0 0 0-1.204-1.575L6.95 12.876l-3.888-1.794Zm5.114 3.397.606 2.123.233-1.281a1 1 0 0 1 .277-.528l2.22-2.22-3.336 1.906Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default TelegramIcon;
