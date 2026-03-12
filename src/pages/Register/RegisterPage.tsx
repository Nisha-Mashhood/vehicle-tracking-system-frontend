import { useForm } from "react-hook-form"
import { registerValidation } from "../../validations/registerValidation"
import InputField from "../../components/form/InputField"
import type { RegisterFormValues } from "../../types/auth-types"

export default function RegisterPage() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>()

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data)
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}>

      <h2>Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <InputField
          label="First Name"
          name="firstName"
          register={register}
          validation={registerValidation.firstName}
          error={errors.firstName}
        />

        <InputField
          label="Last Name"
          name="lastName"
          register={register}
          validation={registerValidation.lastName}
          error={errors.lastName}
        />

        <InputField
          label="Email"
          name="email"
          register={register}
          validation={registerValidation.email}
          error={errors.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          validation={registerValidation.password}
          error={errors.password}
        />

        <button type="submit">Register</button>

      </form>

    </div>
  )
}