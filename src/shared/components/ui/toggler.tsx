import { useState } from "react";

interface TogglerProps {
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Toggler = ({
  defaultValue = false,
  onChange,
  disabled = false,
  className = "",
}: TogglerProps) => {
  const [isOn, setIsOn] = useState(defaultValue);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${isOn ? "bg-blue-500" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isOn ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
};

export default Toggler;
