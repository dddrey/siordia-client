import { ChevronRight, Lock } from "lucide-react";
import { cn } from "../../utils/cn";

interface ItemButtonProps {
  type?: "default" | "permission";
  hasAccess?: boolean;
}

const ItemButton = ({ hasAccess = true }: ItemButtonProps) => {
  const renderIcon = () => {
    if (!hasAccess) {
      return <Lock size={16} className="text-red-400" />;
    }

    return (
      <ChevronRight
        strokeWidth={2}
        size={16}
        className="text-black text-opacity-30"
      />
    );
  };

  return (
    <div className="relative w-8 h-8">
      <button
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "bg-secondary border border-border p-2 rounded-full text-[12px] font-medium",
          "transition-colors duration-200"
        )}
      >
        {renderIcon()}
      </button>
    </div>
  );
};

export default ItemButton;
