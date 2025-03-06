import { cn } from "../../utils/cn";

interface SkeletonProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  borderRadius?: number;
  bgColor?: string;
  shadowColor?: string;
}

const Skeleton = ({
  className,
  height = 56,
  width = "100%",
  borderRadius = 10,
  bgColor = "bg-primary",
  shadowColor = "shadow-card-sm-light",
}: SkeletonProps) => {
  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div
      style={style}
      className={cn("animate-pulse", bgColor, shadowColor, className)}
    />
  );
};

export default Skeleton;
