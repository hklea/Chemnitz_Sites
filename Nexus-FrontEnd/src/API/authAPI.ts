import axios from "../config/axiosConfig";
import {User} from "../types/userType";


export interface RegisterResponse {
  message: string;
}

export const registerUser = async (userData: User): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>("/api/auth/register", userData);
  return response.data;
};


