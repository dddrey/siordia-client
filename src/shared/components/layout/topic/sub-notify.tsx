import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LockIcon } from "../../ui/icons/lock";

interface SubNotifyProps {
  show: boolean;
  onComplete?: () => void;
}

const SubNotify = ({ show, onComplete }: SubNotifyProps) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const navigate = useNavigate();

  // Сброс таймера при показе
  useEffect(() => {
    if (show) {
      setTimeLeft(5);
    }
  }, [show]);

  // Таймер для автоскрытия
  useEffect(() => {
    if (!show || timeLeft < 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Даем время для завершения анимации до 100%
          setTimeout(() => {
            onComplete?.();
          }, 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, timeLeft, onComplete]);

  const handleClick = () => {
    navigate("/subscriptions");
  };

  // Правильный расчет прогресса для круга с радиусом 16
  const radius = 16;
  const circumference = 2 * Math.PI * radius; // ≈ 100.53
  // Используем Math.max(0, timeLeft) чтобы избежать отрицательных значений
  const progress = ((5 - Math.max(0, timeLeft)) / 4.1) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!show) return null;

  return (
    <div className="fixed bottom-[40px] left-4 z-50 w-full">
      <div className="max-w-[500px] mx-auto w-full flex justify-start">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.5,
          }}
          className="shadow-card-sm-light bg-primary rounded-[12px] border border-border overflow-hidden"
          onClick={handleClick}
        >
          <div className="p-2 px-3 flex items-center gap-1.5 cursor-pointer">
            {/* Круглый таймер */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg
                className="w-10 h-10 transform -rotate-90"
                viewBox="0 0 40 40"
              >
                {/* Фоновый круг */}
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                {/* Прогресс */}
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="#00D26A"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              {/* Замок в центре */}
              <div className="absolute inset-0 flex items-center justify-center">
                <LockIcon
                  size={16}
                  strokeColor="#00D26A"
                  className="text-textAccent"
                />
              </div>
            </div>

            {/* Текст */}
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-textPrimary text-[12px] font-medium leading-tight">
                Больше контента
              </p>
              <p className="text-textSecondary text-[11px] mt-1 leading-tight">
                нажмите для покупки подписки
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubNotify;
