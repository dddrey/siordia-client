import useTelegram from "@/shared/hooks/use-telegram";
import { ContentType, ContentTypeLabels } from "../../types/interfaces";
import { cn } from "../../utils/cn";

interface TypeFilterProps {
  selectedType: ContentType | null;
  onChange: (type: ContentType | null) => void;
}

const TypeFilter = ({ selectedType, onChange }: TypeFilterProps) => {
  const { setHapticFeedback } = useTelegram();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          onChange(null);
          setHapticFeedback();
        }}
        className={cn(
          "px-1.5 py-1 rounded-[10px] text-[12px] font-medium border transition-colors",
          !selectedType
            ? "bg-primary text-textAccent border-border"
            : "border-border/60 text-textAccent/60"
        )}
      >
        Все
      </button>
      {Object.values(ContentType).map((type) => (
        <button
          key={type}
          onClick={() => {
            onChange(type);
            setHapticFeedback();
          }}
          className={cn(
            "px-1.5 py-1 rounded-[10px] text-[12px] font-medium border transition-colors",
            selectedType === type
              ? "bg-primary text-textAccent border-border"
              : "border-border/60 text-textAccent/60"
          )}
        >
          {ContentTypeLabels[type]}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
