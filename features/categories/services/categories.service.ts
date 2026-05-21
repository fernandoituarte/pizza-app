import type { Category } from "@/features/products/types";
import { apiClient } from "@/shared/lib/api/api-client";

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export const categoriesService = {
  async getCategories(
    params: PaginationParams,
  ): Promise<PaginatedResponse<Category>> {
    const { data } = await apiClient.get<PaginatedResponse<Category>>(
      "/categories",
      { params },
    );
    return data;
  },
};
