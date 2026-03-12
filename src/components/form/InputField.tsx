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
    <div style={{ marginBottom: "16px" }}>

      <label>{label}</label>

      <input
        type={type}
        {...register(name, validation)}
        style={{
          display: "block",
          width: "100%",
          padding: "8px",
          marginTop: "5px"
        }}
      />

      <FormError message={error?.message} />

    </div>
  )
}