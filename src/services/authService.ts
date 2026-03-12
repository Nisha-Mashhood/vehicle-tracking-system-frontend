import axiosInstance from "../api/axiosInstance";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  userId: string;
}

export const loginUser = async (
  data: LoginRequestDTO
): Promise<LoginResponseDTO> => {
  const response = await axiosInstance.post<LoginResponseDTO>(
    "/auth/login",
    data
  );

  return response.data;
};