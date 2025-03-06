import { UseFormRegister, FieldError, Path, FieldValues } from "react-hook-form"

interface FormTextAreaProps<T extends FieldValues> {
  id: Path<T>
  label: string
  placeholder?: string
  disabled?: boolean
  register: UseFormRegister<T>
  error?: FieldError
  required?: boolean
  rows?: number
}

const FormTextArea = <T extends FieldValues>({
  id,
  label,
  placeholder,
  disabled = false,
  register,
  error,
  required = false,
  rows = 4
}: FormTextAreaProps<T>) => {
  return (
    <div className="flex flex-col gap-2 min-h-[120px]">
      <div className="flex flex-col gap-2">
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          className="border rounded p-2 resize-none"
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          {...register(id, { required })}
        />
      </div>
      <div className="min-h-[20px]">
        {error && (
          <span className="text-red-500 text-sm">{error.message}</span>
        )}
      </div>
    </div>
  )
}

export default FormTextArea 