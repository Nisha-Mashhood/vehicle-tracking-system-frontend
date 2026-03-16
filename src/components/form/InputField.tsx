import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form"
import FormError from "./FormError"

interface InputFieldProps<T extends FieldValues> {
  label: string
  name: Path<T>
  type?: string
  register: UseFormRegister<T>
  validation?: object
  error?: FieldError
}

export default function InputField<T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  validation,
  error
}: InputFieldProps<T>) {

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>

      <input
        type={type}
        {...register(name, validation)}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <FormError message={error?.message} />

    </div>
  )
}