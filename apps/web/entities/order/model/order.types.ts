/**
 * Order Entity - 型定義
 */

/**
 * 注文ステータス
 */
export type OrderStatusType =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * 配送先住所
 */
export interface ShippingAddress {
  lastName: string;
  firstName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address1: string;
  address2?: string;
  phone: string;
}

/**
 * 注文アイテム
 */
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

/**
 * 注文
 */
export interface Order {
  id: string;
  userId: string;
  items: Array<OrderItem>;
  total: number;
  status: OrderStatusType;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}
