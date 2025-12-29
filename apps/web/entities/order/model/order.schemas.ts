/**
 * Order Entity - Zod バリデーションスキーマ
 */

import { z } from "zod";

/**
 * 注文ステータスのスキーマ
 */
export const orderStatusSchema = z.enum([
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

/**
 * 配送先住所のスキーマ
 */
export const shippingAddressSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  postalCode: z.string(),
  prefecture: z.string(),
  city: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  phone: z.string(),
});

/**
 * 注文アイテムのスキーマ
 */
export const orderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
  imageUrl: z.string(),
});

/**
 * 注文のバリデーションスキーマ
 */
export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(orderItemSchema),
  total: z.number(),
  status: orderStatusSchema,
  shippingAddress: shippingAddressSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});
