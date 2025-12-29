/**
 * Checkout Feature - 型定義
 */

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
 * 支払い方法
 */
export interface PaymentMethod {
  type: "credit_card" | "convenience_store" | "bank_transfer";
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

/**
 * チェックアウトステップ
 */
export type CheckoutStep = "shipping" | "payment" | "confirmation" | "complete";

/**
 * 注文作成リクエスト
 */
export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}
