/**
 * Product Entity - 型定義
 */

/**
 * 商品
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 商品カテゴリ
 */
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}
