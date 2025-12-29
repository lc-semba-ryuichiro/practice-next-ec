/**
 * Checkout Feature - API クライアント
 */

import type { Order } from "@/entities/order";
import { apiClient } from "@/shared/api/client";

import type { CreateOrderRequest } from "../model/checkout.types";

/**
 * 注文を作成する
 * @param request - 注文作成リクエスト
 * @returns 作成された注文
 */
export async function createOrder(request: CreateOrderRequest): Promise<Order> {
  const response = await apiClient.post<Order>("/orders", request);
  return response.data;
}
