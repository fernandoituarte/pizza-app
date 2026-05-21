import {
  getRefreshToken,
  clearTokens,
  setTokens,
} from "@/features/auth/lib/tokenManager";
import { sessionExpired } from "@/features/auth/store/auth.slice";
import { AuthResponse, AuthTokens } from "@/features/auth/types";
import store from "@/shared/store";
import { apiClient } from "../api-client";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

export interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const isServer = () => typeof window === "undefined";

const isAuthRoute = (url?: string) =>
  url?.includes("/auth/") || url?.includes("/oauth/");

export const shouldRetryResponseError = (error: AxiosError) => {
  const config = error.config as AxiosRequestConfigWithRetry | undefined;

  return (
    !isServer() &&
    !!config &&
    error.response?.status === 401 &&
    !config._retry &&
    !isAuthRoute(config.url)
  );
};

export const refreshSession = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    store.dispatch(sessionExpired());
    throw new Error("No refresh token available");
  }

  const { data } = await apiClient.post<AuthTokens>("/saas/users/refresh", {
    refreshToken,
  });

  if (data) {
    setTokens(data);
  }
};
