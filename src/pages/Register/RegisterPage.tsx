import { useForm } from "react-hook-form"
import { registerValidation } from "../../validations/registerValidation"
import InputField from "../../components/form/InputField"
import type { RegisterFormValues } from "../../types/auth-types"
import { useRegister } from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const { register: registerUserHook, loading, error } = useRegister();
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>()

  const onSubmit = async(data: RegisterFormValues) => {
    const response = await registerUserHook(data);
    alert(response.message);
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}>
      <h2>Register</h2>

      {error && (
        <p style={{ color: "red", background: "#ffe5e5", padding: "8px", borderRadius: "4px" }}>
            {error}
        </p>
      )}
      
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

        <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
        </button>

      </form>

    </div>
  )
}