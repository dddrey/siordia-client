import { FC } from "react";

interface LockIconProps {
  className?: string;
  color?: string;
  strokeColor?: string;
  size?: number;
}

export const LockIcon: FC<LockIconProps> = ({
  className = "",
  color = "none",
  strokeColor = "#1C274C",
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 15V17M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H18M6 10C4.89543 10 4 10.8954 4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12C20 10.8954 19.1046 10 18 10"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
