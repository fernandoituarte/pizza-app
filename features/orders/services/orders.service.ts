import type { CartItem } from "@/features/cart/types";
import { apiClient } from "@/shared/lib/api/api-client";

export interface Order {
  id: string;
  createdAt: string;
  total: number;
  status: string;
}

export interface OrderLine {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  extras: CartItem["extras"];
  removedIngredients: CartItem["removedIngredients"];
}

export interface CreateOrderPayload {
  items: OrderLine[];
}

export const ordersService = {
  async getOrders(): Promise<{ items: Order[] }> {
    const { data } = await apiClient.get<{ items: Order[] }>("/orders/me");
    return data;
  },

  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const { data } = await apiClient.post<Order>("/orders", payload);
    return data;
  },

  async createPaymentSession(order: Order): Promise<{ checkoutUrl: string }> {
    const { data } = await apiClient.post<{ checkoutUrl: string }>(
      "/payment/create-session",
      { ...order, provider: "stripe" },
    );
    return data;
  },
};
