import { FC } from "react";

interface FamilyIconProps {
  className?: string;
  color?: string;
  strokeColor?: string;
  size?: number;
}

export const FamilyIcon: FC<FamilyIconProps> = ({
  className = "",
  color = "#000000",
  size = 24,
}) => {
  return (
    <svg
      fill={color}
      width={size}
      height={size}
      viewBox="-1 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M7.181 15.129a1.81 1.81 0 0 0 .223.872H1.85a1.27 1.27 0 0 1-1.267-1.267v-1.9A3.176 3.176 0 0 1 3.75 9.667h5.478a3.177 3.177 0 0 0 .557 1.067 3.135 3.135 0 0 0-2.604 3.086zM6.6 8.717a3.236 3.236 0 1 1 3.236-3.236A3.236 3.236 0 0 1 6.6 8.717zm9.817 6.412a.875.875 0 0 1-.872.872H9.003a.875.875 0 0 1-.872-.872V13.82a2.187 2.187 0 0 1 2.18-2.18h3.925a2.187 2.187 0 0 1 2.18 2.18zm-1.915-6.372a2.228 2.228 0 1 1-2.228-2.228 2.228 2.228 0 0 1 2.228 2.228z" />
    </svg>
  );
};
