import axios from "axios";
import { envs } from "@/config/envs";

export const apiClient = axios.create({
  baseURL: envs.API_URL,
  headers: { "Content-Type": "application/json" },
});