/**
 * Products Feature - API クライアント
 */

import type { Product } from "@/entities/product";
import { apiClient } from "@/shared/api/client";

import type { ProductFilters } from "../model/products.types";

interface GetProductsParams {
  filters?: ProductFilters;
  page?: number | undefined;
  limit?: number | undefined;
}

interface ProductsResponse {
  data: Array<Product>;
  total: number;
  page: number;
  totalPages: number;
}

/**
 * 商品一覧を取得する
 * @param params - 取得パラメータ
 * @returns 商品一覧レスポンス
 */
export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.limit !== undefined) searchParams.set("limit", String(params.limit));
  if (params.filters?.categoryId !== undefined)
    searchParams.set("categoryId", params.filters.categoryId);
  if (params.filters?.minPrice !== undefined)
    searchParams.set("minPrice", String(params.filters.minPrice));
  if (params.filters?.maxPrice !== undefined)
    searchParams.set("maxPrice", String(params.filters.maxPrice));
  if (params.filters?.sortBy) searchParams.set("sortBy", params.filters.sortBy);
  if (params.filters?.searchQuery) searchParams.set("q", params.filters.searchQuery);

  const query = searchParams.toString();
  const path = query ? `/products?${query}` : "/products";

  const response = await apiClient.get<ProductsResponse>(path);
  return response.data;
}

/**
 * 商品詳細を取得する
 * @param id - 商品 ID
 * @returns 商品詳細
 */
export async function getProduct(id: string): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}
