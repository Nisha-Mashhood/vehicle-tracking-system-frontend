import axiosInstance from "../api/axiosInstance";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  success: boolean
  message: string
  data: {
    token: string
    userId: string
    email: string
  }
}

export interface RegisterRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  success: boolean;
  message: string;
}

export const registerUser = async (
  data: RegisterRequestDTO
): Promise<RegisterResponseDTO> => {

  const response = await axiosInstance.post<RegisterResponseDTO>(
    "/auth/register",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginRequestDTO
): Promise<LoginResponseDTO> => {
  const response = await axiosInstance.post<LoginResponseDTO>(
    "/auth/login",
    data
  );

  return response.data;
};