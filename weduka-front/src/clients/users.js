import { apiClient } from "src/lib/axios";
import { AxiosError } from "axios";

export class UsersApi {
  async list() {
    try {
      const url = "v1/users";
      const response = await apiClient.get(url);

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }

      return new Error("Unkown error while fetching users.");
    }
  }

  async create(payload) {
    try {
      const url = `v1/users`;
      const response = await apiClient.post(url, payload);

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }

      return new Error("Unkown error while fetching users.");
    }
  }

  async delete(userId) {
    try {
      const url = `v1/users/${userId}`;
      const response = await apiClient.delete(url);

      return response.status === 200;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }

      return new Error("Unkown error while fetching users.");
    }
  }

  async update(userId, payload) {
    try {
      const url = `v1/users/${userId}`;
      const response = await apiClient.patch(url, payload);

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }

      return new Error("Unkown error while fetching users.");
    }
  }
}

export const usersApi = new UsersApi();
