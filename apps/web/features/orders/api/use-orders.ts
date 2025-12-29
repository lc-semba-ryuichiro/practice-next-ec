/**
 * Orders Feature - Orders List Hook
 */

import { useQuery } from "@tanstack/react-query";

import type { Order } from "@/entities/order";

import { getOrders } from "./orders.api";

import type { UseQueryResult } from "@tanstack/react-query";

interface OrdersResponse {
  data: Array<Order>;
  total: number;
}

/**
 * 注文一覧を取得する hook
 * @returns 注文一覧クエリ結果
 */
export function useOrders(): UseQueryResult<OrdersResponse> {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
