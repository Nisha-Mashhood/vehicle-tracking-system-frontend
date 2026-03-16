import { useForm } from "react-hook-form"
import { registerValidation } from "../../validations/registerValidation"
import InputField from "../../components/form/InputField"
import type { RegisterFormValues } from "../../types/auth-types"
import { useRegister } from "../../hooks/useRegister"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import { toast } from "react-toastify"

export default function RegisterPage() {

  const { register: registerUserHook, loading, error } = useRegister()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>()

  const onSubmit = async (data: RegisterFormValues) => {
    const response = await registerUserHook(data)
    toast.success(response.message);
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-blue-200">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-16 mb-2" />
          <h2 className="text-2xl font-bold text-gray-700">Register</h2>
        </div>
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}