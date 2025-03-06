import { cn } from "../../utils/cn";

interface AvatarProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Avatar = ({ size = "medium", className }: AvatarProps) => {
  const sizeClass = {
    small: "w-10 h-10",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div
      className={cn(
        "rounded-full",
        "bg-primary",
        "text-textPrimary",
        "flex",
        "items-center",
        "justify-center",
        sizeClass[size],
        className
      )}
    >
      A
    </div>
  );
};

export default Avatar;
