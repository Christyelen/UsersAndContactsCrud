import { apiClient } from "src/lib/axios";
import { AxiosError } from "axios";

export class ContactsApi {
  async create(userId, payload) {
    try {
      const url = `v1/users/${userId}/contacts`;
      const response = await apiClient.post(url, payload);

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }

      return new Error("Unkown error while fetching users.");
    }
  }

  async delete(userId, contactId) {
    try {
      const url = `v1/users/${userId}/contacts/${contactId}`;
      const response = await apiClient.delete(url);

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }

      return new Error("Unkown error while fetching users.");
    }
  }

  async update(userId, contactId, payload) {
    try {
      const url = `v1/users/${userId}/contacts/${contactId}`;
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

export const contactsApi = new ContactsApi();
