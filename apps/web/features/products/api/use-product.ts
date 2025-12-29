/**
 * Products Feature - Single Product Hook
 */

import { useQuery } from "@tanstack/react-query";

import type { Product } from "@/entities/product";

import { getProduct } from "./products.api";

import type { UseQueryResult } from "@tanstack/react-query";

/**
 * 商品詳細を取得する hook
 * @param id - 商品 ID
 * @returns 商品詳細クエリ結果
 */
export function useProduct(id: string): UseQueryResult<Product> {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
}
