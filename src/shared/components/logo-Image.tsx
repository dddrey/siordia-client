import Skeleton from "./ui/skeleton";
import { cn } from "../utils/cn";

interface LogoImageProps {
  type: "small" | "large";
  className?: string;
  title?: string;
  isLoading?: boolean;
}

const LogoImage = ({
  className = "",
  title = "Kickstart GO",
  isLoading = false,
}: LogoImageProps) => {
  if (isLoading) {
    return (
      <div className="w-[94%] mx-auto py-3 flex items-center justify-start">
        <Skeleton className={cn("h-[100px] w-[50%] mt-10 mb-3", className)} />
      </div>
    );
  }

  return (
    <div className="w-[94%] mx-auto py-3 flex items-center justify-start">
      <h1 className="text-textPrimary text-[44px] leading-[40px] w-[50%] font-bold mt-10 mb-3">
        {title}
      </h1>
    </div>
  );
};

export default LogoImage;
