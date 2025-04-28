import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { useState } from "react";
import { cn } from "@/shared/utils/cn";

interface FormTextAreaProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  rows?: number;
}

const FormTextArea = <T extends FieldValues>({
  id,
  label,
  placeholder,
  disabled = false,
  register,
  error,
  required = false,
  rows = 4,
}: FormTextAreaProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  const textareaClass =
    "border rounded-[8px] bg-inherit p-2 text-gray-500 placeholder:text-gray-500 text-[14px] placeholder:text-[14px] border-border outline-none resize-none";
  const labelClass = "text-[13px] text-gray-500";
  const errorClass = "text-red-500 text-sm";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 transition-all duration-500">
        <label
          className={cn(labelClass, isFocused && "text-blue-500")}
          htmlFor={id}
        >
          {label}
        </label>
        <textarea
          id={id}
          className={cn(
            textareaClass,
            isFocused &&
              "border-blue-500 text-blue-500 placeholder:text-blue-500"
          )}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          {...register(id, {
            required,
            onBlur: () => setIsFocused(false),
          })}
        />
      </div>
      <div className="min-h-[24px] text-[12px]">
        {error && (
          <span className={cn(errorClass, "text-[12px]")}>{error.message}</span>
        )}
      </div>
    </div>
  );
};

export default FormTextArea;
