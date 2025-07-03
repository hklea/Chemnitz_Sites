
import axios from "../config/axiosConfig";
import { User } from "../types/userType";

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    location?: string;
  };
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    location?: string;
  };
}

export const registerUser = async (userData: User): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/api/auth/register", userData);
  return response.data;
};


export const loginUser = async (
  userData: Pick<User, "email" | "password">
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/api/auth/login", userData);
  return response.data;
};
