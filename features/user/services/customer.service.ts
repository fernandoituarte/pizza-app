import type { AuthResponse, SessionUser } from "@/features/auth/types";
import { apiClient } from "@/shared/lib/api/api-client";

/**
 * Customer service.
 */
export const customerService = {
  async getCurrentUser() {
    const { data } = await apiClient.get<SessionUser | null >(
      "/customer/me",
    );
    return data;
  },

  async updateCurrentUser() {
    const { data } = await apiClient.patch<{ user: SessionUser | null }>(
      "/customer/me",
    );
    return data;
  },
  async updatePassword() {
    const { data } = await apiClient.patch<{ message: string | null }>(
      "/me/password",
    );
    return data;
  },
  async deactivateCurrentUser() {
    const { data } = await apiClient.patch<{ message: string | null }>(
      "/me/deactivate",
    );
    return data;
  },
  async restoreCurrentUser() {
    const { data } = await apiClient.patch<AuthResponse | null>(
      "/me/deactivate",
    );
    return data;
  },
  async deleteCurrentUser() {
    const { data } = await apiClient.delete<{ message: string | null }>(
      "/me",
    );
    return data;
  },
};
