import { Link } from "react-router-dom";
import { handleError } from "../utils/handle-error";
import { ServerError } from "../types/response";
import useTelegram from "../hooks/use-telegram";

interface NotFoundProps {
  code?: number;
  title?: string;
  description?: string;
  withButton?: boolean;
  buttonHref?: string;
  buttonText?: string;
  error?: unknown; // Добавляем возможность передать ошибку
}

const ErrorComponent = ({
  code,
  title,
  description,
  withButton = true,
  buttonHref = "/",
  buttonText = "Вернуться на главную",
  error,
}: NotFoundProps) => {
  let errorDetails: ServerError | undefined;
  if (error) {
    errorDetails = handleError(error);
  }

  const { setHapticFeedback } = useTelegram();

  const finalButtonHref = errorDetails?.href || buttonHref;
  const finalButtonText =
    errorDetails?.type === "FORBIDDEN" ? "Купить подписку" : buttonText;

  return (
    <div className="flex items-center justify-center px-2">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-textPrimary animate-pulse">
          {errorDetails ? errorDetails.statusCode : code}
        </h1>

        <h2 className="text-2xl md:text-3xl font-medium text-textPrimary">
          {errorDetails ? errorDetails.message : title}
        </h2>

        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
          {errorDetails ? errorDetails.details || description : description}
        </p>

        {withButton && (
          <Link
            onClick={setHapticFeedback}
            to={finalButtonHref}
            className="inline-block px-6 py-3 text-sm font-medium text-textPrimary border border-textPrimary rounded-lg transition-colors duration-300"
          >
            {finalButtonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
