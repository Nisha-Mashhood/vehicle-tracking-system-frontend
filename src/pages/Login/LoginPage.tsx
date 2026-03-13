import { useForm } from "react-hook-form"
import { loginValidation } from "../../validations/loginValidation"
import InputField from "../../components/form/InputField"
import type { LoginFormValues } from "../../types/auth-types"
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const onSubmit = async(data: LoginFormValues) => {
    const response = await login(data);
    // store token
    localStorage.setItem("token", response.token);
    console.log(response);
    navigate("/home");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}>
      
      <h2>Login</h2>
      
      {error && (
        <p style={{ color: "red", background: "#ffe5e5", padding: "8px", borderRadius: "4px" }}>
            {error}
        </p>
      )}

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

        <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  )
}