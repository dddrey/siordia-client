import { ChevronRight, Lock } from "lucide-react";
import { cn } from "../../utils/cn";

interface ItemButtonProps {
  type?: "default" | "permission";
  hasAccess?: boolean;
  color?: string;
}

const ItemButton = ({
  hasAccess = true,
  color = "text-textAccent",
}: ItemButtonProps) => {
  const renderIcon = () => {
    if (!hasAccess) {
      return <Lock size={16} className="text-red-400" />;
    }

    return <ChevronRight strokeWidth={2} size={16} />;
  };

  return (
    <div className="relative w-8 h-8">
      <button
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          `bg-primary border p-2 rounded-full text-[12px] text-${color} font-medium`,
          "transition-colors duration-200",
          hasAccess ? `border-${color}` : `border-red-400`
        )}
      >
        {renderIcon()}
      </button>
    </div>
  );
};

export default ItemButton;
