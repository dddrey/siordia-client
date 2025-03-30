import { Fragment } from "react";
import Skeleton from "./ui/skeleton";
import { cn } from "../utils/cn";

interface LogoImageProps {
  type: "small" | "large";
  className?: string;
  title?: string;
  isLoading?: boolean;
}

const LogoImage = ({
  type,
  className = "",
  title = "SKILL UP",
  isLoading = false,
}: LogoImageProps) => {
  if (isLoading) {
    return (
      <Skeleton
        height={type === "small" ? 189 : 257}
        borderRadius={12}
        className={`max-w-[94%] mx-auto ${className}`}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative shadow-card-sm-light flex items-center justify-center rounded-[12px] overflow-hidden",
        className,
        type === "small"
          ? "min-h-[200px] border border-border"
          : "min-h-[250px]"
      )}
    >
      <Fragment>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-textPrimary p-4">
          <p
            className={cn(
              "font-bold font-lalezar text-center text-textPrimary",
              type === "small"
                ? "text-[24px] leading-[22px]"
                : "text-[36px] leading-[48px]"
            )}
          >
            {title}
          </p>
        </div>
      </Fragment>
    </div>
  );
};

export default LogoImage;
