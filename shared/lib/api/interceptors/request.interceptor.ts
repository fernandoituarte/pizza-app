import { apiClient } from "../api-client";
import { updateHeader } from "./helpers";

export const attachRequestInterceptor = () => {
  apiClient.interceptors.request.use(
    (request) => updateHeader(request),
    (error) => Promise.reject(error),
  );
};
