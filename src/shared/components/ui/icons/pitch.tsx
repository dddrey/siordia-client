import { FC } from "react";

interface PitchIconProps {
  className?: string;
  color?: string;
  strokeColor?: string;
  size?: number;
}

export const PitchIcon: FC<PitchIconProps> = ({
  className = "",
  color = "#FFFFFF",
  strokeColor = "#231f20",
  size = 32,
}) => {
  return (
    <svg
      enableBackground="new 0 0 32 32"
      height={size}
      width={size}
      viewBox="0 0 32 28"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="pitch">
        <path
          fill={color}
          stroke={strokeColor}
          strokeWidth="0.5"
          d="M30,1H2C1.448,1,1,1.448,1,2v24c0,0.552,0.448,1,1,1h28c0.552,0,1-0.448,1-1V2C31,1.448,30.552,1,30,1z M25,16.815
          c-1.162-0.414-2-1.514-2-2.815s0.838-2.401,2-2.816V16.815z M27,7h2v14h-2V7z M15,15.722c-0.595-0.347-1-0.984-1-1.722
          s0.405-1.375,1-1.722V15.722z M17,12.278c0.595,0.347,1,0.984,1,1.722s-0.405,1.375-1,1.722V12.278z M7,11.184
          C8.162,11.599,9,12.698,9,14s-0.838,2.401-2,2.816V11.184z M5,21H3V7h2V21z M3,23h3c0.552,0,1-0.448,1-1v-3.101
          c2.279-0.465,4-2.484,4-4.899S9.279,9.566,7,9.101V6c0-0.552-0.448-1-1-1H3V3h12v7.142c-1.72,0.447-3,2-3,3.858
          s1.28,3.411,3,3.858V25H3V23z M17,25v-7.142c1.72-0.447,3-2,3-3.858s-1.28-3.411-3-3.858V3h12v2h-3c-0.552,0-1,0.448-1,1v3.101
          c-2.279,0.465-4,2.484-4,4.899s1.721,4.434,4,4.899V22c0,0.552,0.448,1,1,1h3v2H17z"
        />
      </g>
    </svg>
  );
};
