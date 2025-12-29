/**
 * Orders Feature - Single Order Hook
 */

import { useQuery } from "@tanstack/react-query";

import type { Order } from "@/entities/order";

import { getOrder } from "./orders.api";

import type { UseQueryResult } from "@tanstack/react-query";

/**
 * 注文詳細を取得する hook
 * @param id - 注文 ID
 * @returns 注文詳細クエリ結果
 */
export function useOrder(id: string): UseQueryResult<Order> {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: Boolean(id),
  });
}
