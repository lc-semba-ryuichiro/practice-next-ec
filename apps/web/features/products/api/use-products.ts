/**
 * Products Feature - Products List Hook
 */

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import type { Product } from "@/entities/product";

import { getProducts } from "./products.api";
import { productFiltersAtom } from "../model/products.atoms";

import type { ProductFilters } from "../model/products.types";
import type { UseQueryResult } from "@tanstack/react-query";

interface UseProductsOptions {
  filters?: ProductFilters;
  page?: number;
  limit?: number;
}

interface ProductsResponse {
  data: Array<Product>;
  total: number;
  page: number;
  totalPages: number;
}

/**
 * 商品一覧を取得する hook
 * @param options - 取得オプション
 * @returns 商品一覧クエリ結果
 */
export function useProducts(options: UseProductsOptions = {}): UseQueryResult<ProductsResponse> {
  const globalFilters = useAtomValue(productFiltersAtom);
  const filters = { ...globalFilters, ...options.filters };

  return useQuery({
    queryKey: ["products", filters, options.page, options.limit],
    queryFn: () =>
      getProducts({
        filters,
        page: options.page,
        limit: options.limit,
      }),
  });
}
