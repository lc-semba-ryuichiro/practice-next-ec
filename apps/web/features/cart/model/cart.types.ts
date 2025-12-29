/**
 * Cart Feature - 型定義
 */

/**
 * カートアイテム
 */
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

/**
 * カート
 */
export interface Cart {
  items: Array<CartItem>;
  updatedAt: number;
}
