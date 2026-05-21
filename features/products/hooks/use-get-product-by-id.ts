import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/features/products/services/products.service";

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getProductById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
};
