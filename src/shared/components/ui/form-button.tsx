import useTelegram from "@/shared/hooks/use-telegram";
import { cn } from "../../utils/cn";

interface FormButtonProps {
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  variant?: "create" | "update" | "delete" | "cancel";
  children?: React.ReactNode;
  className?: string;
}

const FormButton = ({
  type = "submit",
  disabled = false,
  isLoading = false,
  onClick,
  variant = "create",
  children,
  className = "",
}: FormButtonProps) => {
  const { setHapticFeedback } = useTelegram();
  const buttonClass =
    "text-white rounded-[8px] text-[13px] px-4 py-2 transition-colors duration-200";
  const disabledClass =
    "disabled:bg-inherit disabled:text-border disabled:border disabled:border-border";

  const handleClick = () => {
    setHapticFeedback();
    onClick?.();
  };

  const getButtonStyle = () => {
    switch (variant) {
      case "create":
        return "bg-blue-500 hover:bg-blue-500";
      case "update":
        return "bg-green-500 hover:bg-green-600";
      case "delete":
        return "bg-red-500 hover:bg-red-600";
      case "cancel":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-blue-500 hover:bg-blue-500";
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={cn(buttonClass, disabledClass, getButtonStyle(), className)}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  );
};

export default FormButton;
