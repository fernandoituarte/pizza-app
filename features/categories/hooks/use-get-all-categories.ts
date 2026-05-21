import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "@/features/categories/services/categories.service";
import type { PaginationParams } from "@/features/categories/services/categories.service";

export const useGetAllCategories = ({ limit, offset }: PaginationParams) => {
  return useQuery({
    queryKey: ["categories", limit, offset],
    queryFn: () => categoriesService.getCategories({ limit, offset }),
    staleTime: 5 * 60 * 1000,
  });
};
