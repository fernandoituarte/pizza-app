import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/features/orders/services/orders.service";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersService.getOrders(),
    staleTime: 60 * 1000,
  });
};
