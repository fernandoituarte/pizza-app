import type { Product } from "@/features/products/types";
import type { PaginatedResponse, PaginationParams } from "@/features/categories/services/categories.service";
import { apiClient } from "@/shared/lib/api/api-client";

export type { Product };

export interface ProductsParams extends PaginationParams {
  category?: string;
}

export const productsService = {
  async getProducts(
    params: ProductsParams,
  ): Promise<PaginatedResponse<Product>> {
    const { data } = await apiClient.get<PaginatedResponse<Product>>(
      "/products",
      {
        params,
      },
    );
    return data;
  },

  async getProductById(id: string): Promise<Product> {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },
};


