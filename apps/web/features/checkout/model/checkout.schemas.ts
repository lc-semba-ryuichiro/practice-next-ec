/**
 * Checkout Feature - Zod バリデーションスキーマ
 */

import { z } from "zod";

/**
 * 配送先住所のフォーム入力型
 * Zod 4 との互換性のため明示的に定義
 */
export interface ShippingAddressFormInput {
  readonly lastName: string;
  readonly firstName: string;
  readonly postalCode: string;
  readonly prefecture: string;
  readonly city: string;
  readonly address1: string;
  readonly address2?: string;
  readonly phone: string;
}

/**
 * クレジットカード支払い型
 */
export interface CreditCardPayment {
  readonly type: "credit_card";
  readonly cardNumber: string;
  readonly cardExpiry: string;
  readonly cardCvc: string;
}

/**
 * コンビニ支払い型
 */
export interface ConvenienceStorePayment {
  readonly type: "convenience_store";
}

/**
 * 銀行振込型
 */
export interface BankTransferPayment {
  readonly type: "bank_transfer";
}

/**
 * 支払い方法のフォーム入力型
 * Zod 4 との互換性のため明示的に定義
 */
export type PaymentMethodFormInput =
  | CreditCardPayment
  | ConvenienceStorePayment
  | BankTransferPayment;

/**
 * 配送先住所のバリデーションスキーマ
 */
export const shippingAddressSchema = z.object({
  lastName: z.string().min(1, "姓は必須です"),
  firstName: z.string().min(1, "名は必須です"),
  postalCode: z
    .string()
    .min(1, "郵便番号は必須です")
    .regex(/^\d{3}-?\d{4}$/, "正しい郵便番号の形式で入力してください"),
  prefecture: z.string().min(1, "都道府県は必須です"),
  city: z.string().min(1, "市区町村は必須です"),
  address1: z.string().min(1, "住所は必須です"),
  address2: z.string().optional(),
  phone: z
    .string()
    .min(1, "電話番号は必須です")
    .regex(/^[\d-]+$/, "正しい電話番号の形式で入力してください"),
});

/**
 * 支払い方法のバリデーションスキーマ
 */
export const paymentMethodSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("credit_card"),
    cardNumber: z.string().min(1, "カード番号は必須です"),
    cardExpiry: z.string().min(1, "有効期限は必須です"),
    cardCvc: z.string().min(1, "セキュリティコードは必須です"),
  }),
  z.object({
    type: z.literal("convenience_store"),
  }),
  z.object({
    type: z.literal("bank_transfer"),
  }),
]);

/**
 * 配送先住所スキーマの型
 * @deprecated ShippingAddressFormInput を使用してください
 */
export type ShippingAddressSchemaType = ShippingAddressFormInput;
