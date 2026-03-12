interface FormErrorProps {
  message?: string
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
      {message}
    </p>
  )
}