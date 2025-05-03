import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import useTelegram from "../hooks/use-telegram";

interface TextContainerProps {
  title: React.ReactNode | string;
  text: string;
  className?: string;
  textClassName?: string;
  isExpandedProp?: boolean;
}

const TextContainer: React.FC<TextContainerProps> = ({
  title,
  text,
  className = "",
  textClassName = "",
  isExpandedProp = false,
}) => {
  const { setHapticFeedback } = useTelegram();
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "0";
    }
  }, [isExpanded, text]);

  return (
    <div className={`bg-primary ${className}`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
          setHapticFeedback();
        }}
      >
        <div className="text-textPrimary text-[14px]">{title}</div>
        <div
          className={`transform transition-transform text-textPrimary text-opacity-70 duration-300 ${isExpanded ? "rotate-180" : ""}`}
        >
          <ChevronDown size={20} />
        </div>
      </div>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out mt-2`}
      >
        <p
          className={cn(
            "text-gray-400 text-[12px] leading-relaxed break-word",
            textClassName
          )}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default TextContainer;
