import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types";
import { apiClient } from "@/shared/lib/api/api-client";
import { clearTokens, setTokens } from "../lib/tokenManager";

/**
 * Auth service.
 */
export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<AuthResponse>(
      "/customer/login",
      payload,
    );

    if (data.tokens) {
      setTokens(data.tokens);
    }
    return data;
  },

  async register(payload: RegisterPayload) {
    const { data } = await apiClient.post<AuthResponse>(
      "/customer/register",
      payload,
    );

    if (data.tokens) {
      setTokens(data.tokens);
    }
    return data;
  },

  async logout() {
    const { data } = await apiClient.post<{ success: true }>(
      "/customer/logout",
    );

    clearTokens();
    return data;
  },

  async forgotPassword(payload: { email: string }) {
    const { data } = await apiClient.post<{ success: true }>(
      "/customer/forgot-password",
      payload,
    );
    return data;
  },

  async resetPassword(payload: { token: string; password: string }) {
    const { data } = await apiClient.post<{ success: true }>(
      "/customer/reset-password",
      payload,
    );
    return data;
  },
};
