"use client";

import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";

export function useSession() {
  const query = useQuery({
    queryKey: ["session", "current-user"],
    queryFn: customerService.getCurrentUser,
    staleTime: 1000 * 30,
  });

  return {
    ...query,
    userData: query.data ?? null,
    isAuthenticated: Boolean(query.data),
  };
}
