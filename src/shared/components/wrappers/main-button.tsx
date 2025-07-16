import useTelegram from "@/shared/hooks/use-telegram";
import { Spinner } from "../ui/spinner";

interface MainButtonProviderProps {
  children: React.ReactNode;
  isVisible?: boolean;
  isLoading?: boolean;
  variant?: "default" | "danger" | "disabled" | "animated";
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isValid?: boolean;
  isStatic?: boolean;
  animated?: boolean;
  isPulsing?: boolean;
}

export const MainButtonProvider = ({
  children,
  isVisible = true,
  isLoading = false,
  variant = "default",
  text = "",
  icon,
  onClick = () => {},
  isValid = true,
  isStatic = false,
  animated = false,
}: MainButtonProviderProps) => {
  const { setHapticFeedback } = useTelegram();
  const isDarkTheme = true;

  const currentVariant = !isValid ? "disabled" : variant;
  const themeVariants = {
    default: {
      color: "#142947", // primary цвет
      textColor: "#FFFFFF", // textPrimary
    },
    danger: {
      color: "#FF3B30", // оставляем красный для опасных действий
      textColor: "#FFFFFF",
    },
    disabled: {
      color: "#0C1E3C", // secondary цвет для disabled
      textColor: "#B0BEC5", // textSecondary
    },
    animated: {
      color: "#00D26A", // border/textAccent цвет для анимированной кнопки
      textColor: "#FFFFFF",
    },
  };

  const getSpinnerColor = () => {
    if (variant === "danger") return "text-white";
    if (variant === "animated") return "text-white";
    return "text-white"; // всегда белый для лучшей видимости
  };

  if (!isVisible && !animated) return <>{children}</>;

  const handleClick = () => {
    if (isValid) {
      setHapticFeedback();
      onClick();
    }
  };

  return (
    <>
      {children}
      <div
        className={`w-full border-t border-white border-opacity-[0.36] flex justify-center items-center pt-4 pb-[25px] z-50 ${
          isStatic ? "static" : "fixed bottom-0 left-0 right-0"
        } ${
          isDarkTheme
            ? "bg-[#0C1E3C] border-[#3C3C43]"
            : "bg-[#F7F7F7] border-[#DEDEDE]"
        } ${animated ? "transition-transform duration-300 translate-y-0" : ""}`}
      >
        <button
          onClick={handleClick}
          disabled={!isValid || isLoading}
          style={{
            backgroundColor: themeVariants[currentVariant].color,
            color: themeVariants[currentVariant].textColor,
          }}
          className={`h-[52px] w-[92%] rounded-[14px] text-[17px] font-semibold ${
            currentVariant === "animated" ? "animate-pulse" : ""
          } ${
            currentVariant === "disabled"
              ? "border-2 border-gray-600 border-opacity-50"
              : ""
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2 opacity-100">
              <Spinner className={getSpinnerColor()} />
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {icon && icon}
              {text}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
