/**
 * Orders Feature - API クライアント
 */

import type { Order } from "@/entities/order";
import { apiClient } from "@/shared/api/client";

interface OrdersResponse {
  data: Array<Order>;
  total: number;
}

/**
 * 注文一覧を取得する
 * @returns 注文一覧レスポンス
 */
export async function getOrders(): Promise<OrdersResponse> {
  const response = await apiClient.get<OrdersResponse>("/orders");
  return response.data;
}

/**
 * 注文詳細を取得する
 * @param id - 注文 ID
 * @returns 注文詳細
 */
export async function getOrder(id: string): Promise<Order> {
  const response = await apiClient.get<Order>(`/orders/${id}`);
  return response.data;
}
