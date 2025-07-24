import {
  User,
  GetAllUsersParams,
  GetAllUsersResponse,
} from "../types/interfaces";
import api from "../utils/axios-instance";

class UserService {
  async getUser(): Promise<User> {
    const response = await api.post<User>("/auth");
    console.log(response.data);
    return response.data;
  }

  async updateUser(): Promise<User> {
    const response = await api.put<User>("/user");
    return response.data;
  }

  async getAllUsers(
    params: GetAllUsersParams = {}
  ): Promise<GetAllUsersResponse> {
    const response = await api.get<GetAllUsersResponse>("/user/all", {
      params,
    });
    console.log(response.data);
    return response.data;
  }

  async exportUsers(): Promise<Blob> {
    const response = await api.get("/user/export");
    return response.data;
  }
}

export const userService = new UserService();
