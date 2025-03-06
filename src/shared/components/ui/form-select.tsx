import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  options: Option[];
  disabled?: boolean;
  register: UseFormRegister<T>;
  error?: Partial<FieldError>;
  required?: boolean;
  placeholder?: string;
}

const FormSelect = <T extends FieldValues>({
  id,
  label,
  options,
  disabled = false,
  register,
  error,
  required = false,
  placeholder = "Выберите...",
}: FormSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col text-[12px] text-gray-500 gap-2 min-h-[78px] relative">
      <div className="flex flex-col gap-2">
        <label htmlFor={id}>{label}</label>
        <div className="relative">
          <select
            id={id}
            className="w-full p-2 appearance-none border border-border rounded-[10px] pr-8 bg-inherit cursor-pointer"
            disabled={disabled}
            {...register(id, { required })}
            onClick={() => setIsOpen(!isOpen)}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option
                className="text-textPrimary text-[12px] rounded-[10px]"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="min-h-[20px]">
        {error && (
          <span className="text-red-500 text-sm">
            {error.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
