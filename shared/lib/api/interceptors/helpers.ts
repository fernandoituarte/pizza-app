import { getAccessToken } from "@/features/auth/lib/tokenManager";
import { InternalAxiosRequestConfig } from "axios";

const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/customer/forgot-password",
  "/customer/reset-password",
  "/categories",
  "/products",
];

const isPublicRoute = (url: string) => {
  return PUBLIC_ROUTES.some((route) => url.includes(route));
};
export const updateHeader = (request: InternalAxiosRequestConfig) => {
  if (isPublicRoute(request.url ?? "")) return request;
  const token = getAccessToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};
