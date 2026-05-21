import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/features/products/services/products.service";
import type { ProductsParams } from "@/features/products/services/products.service";

export const useGetAllProducts = ({ limit, offset, category }: ProductsParams) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", limit, offset, category],
    queryFn: () => productsService.getProducts({ limit, offset, category }),
    staleTime: 5 * 60 * 1000,
  });
  return { data, error, isLoading };
};
