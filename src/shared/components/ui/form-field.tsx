import { cn } from "@/shared/utils/cn";
import { useState } from "react";
import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
  error?: Partial<FieldError>;
  required?: boolean;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const FormField = <T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  disabled = false,
  register,
  error,
  required = false,
  registerOptions,
}: FormFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClass =
    "border rounded-[8px] bg-inherit p-2 text-gray-500 placeholder:text-gray-500 text-[14px] placeholder:text-[14px] border-border outline-none";
  const labelClass = "text-[13px] text-gray-500";
  const errorClass = "text-red-500 text-sm";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 transition-all duration-500 ">
        <label
          className={cn(labelClass, isFocused && "text-blue-500")}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          className={cn(
            inputClass,
            isFocused &&
              "border-blue-500 text-blue-500 placeholder:text-blue-500"
          )}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          {...register(id, {
            required,
            onBlur: () => setIsFocused(false),
            ...registerOptions,
          } as RegisterOptions<T, Path<T>>)}
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

export default FormField;
