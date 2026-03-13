import { useState } from "react";
import { registerUser, type RegisterRequestDTO } from "../services/authService";
export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const register = async (data: RegisterRequestDTO) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerUser(data);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return {
    register,
    loading,
    error
  };
};