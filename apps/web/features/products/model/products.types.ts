/**
 * Products Feature - 型定義
 */

/**
 * ソート順のオプション
 */
export type ProductSortBy = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "newest";

/**
 * 商品フィルター
 */
export interface ProductFilters {
  categoryId?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  sortBy?: ProductSortBy | undefined;
  searchQuery?: string | undefined;
}
