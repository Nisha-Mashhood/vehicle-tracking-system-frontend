import { useForm } from "react-hook-form"
import { loginValidation } from "../../validations/loginValidation"
import InputField from "../../components/form/InputField"
import type { LoginFormValues } from "../../types/auth-types"
import { useLogin } from "../../hooks/useLogin"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function LoginPage() {

  const { login, loading, error } = useLogin()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const onSubmit = async (data: LoginFormValues) => {
    const response = await login(data)

    localStorage.setItem("token", response.data.token)

    navigate("/home")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-blue-200">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-16 mb-2" />
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
        </div>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          Need an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Create an account
          </Link>
        </p>

      </div>

    </div>
  )
}