import { useForm } from "react-hook-form"
import { loginValidation } from "../../validations/loginValidation"
import InputField from "../../components/form/InputField"
import type { LoginFormValues } from "../../types/auth-types"

export default function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}>
      
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <InputField
          label="Email"
          name="email"
          type="text"
          register={register}
          validation={loginValidation.email}
          error={errors.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          validation={loginValidation.password}
          error={errors.password}
        />

        <button type="submit">Login</button>

      </form>

    </div>
  )
}