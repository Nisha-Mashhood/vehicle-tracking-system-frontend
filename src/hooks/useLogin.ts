import { useState } from "react";
import { loginUser, type LoginRequestDTO } from "../services/authService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequestDTO) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(data);
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
    login,
    loading,
    error
  };
};