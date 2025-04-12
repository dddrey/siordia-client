import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface WelcomeTextProps {
  text: string;
  className?: string;
  expandButtonText?: {
    expand: string;
    collapse: string;
  };
}

export const WelcomeText = ({
  text,
  className = "",
  expandButtonText = { expand: "Читать далее", collapse: "Свернуть" },
}: WelcomeTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-primary rounded-xl px-4 py-4 shadow-sm mx-auto mt-3 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <motion.div
          className={`text-textPrimary text-base overflow-hidden`}
          initial={false}
        >
          <p
            className={`font-medium ${!isExpanded ? "line-clamp-5" : ""}`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </motion.div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-textSecondary transition-colors"
        >
          {isExpanded ? (
            <>
              <span>{expandButtonText.collapse}</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>{expandButtonText.expand}</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
