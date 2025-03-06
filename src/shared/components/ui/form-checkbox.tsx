import { useState } from "react";
import useTelegram from "@/shared/hooks/use-telegram";
import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
}

const FormCheckbox = <T extends FieldValues>({
  id,
  label,
  disabled = false,
  register,
  error,
  required = false,
}: FormCheckboxProps<T>) => {
  const [isChecked, setIsChecked] = useState(false);
  const { setHapticFeedback } = useTelegram();

  const handleClick = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      setHapticFeedback();
    }
  };

  return (
    <div className="flex flex-col gap-2 min-h-[48px]">
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            disabled={disabled}
            {...register(id, { required })}
            onChange={(e) => {
              register(id).onChange(e);
              setIsChecked(e.target.checked);
              handleClick();
            }}
          />
          <div
            className={`w-11 h-6 rounded-full transition-all duration-200 ease-in-out
              ${isChecked ? "bg-blue-500" : "bg-gray-200"}
              peer-focus:ring-2 peer-focus:ring-blue-300 
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all after:duration-200
              ${isChecked ? "after:translate-x-full after:border-white" : ""}`}
          />
          <span className="ml-3 text-sm font-medium text-gray-500">
            {label}
          </span>
        </label>
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default FormCheckbox;
