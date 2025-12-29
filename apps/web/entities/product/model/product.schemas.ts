/**
 * Product Entity - Zod バリデーションスキーマ
 */

import { z } from "zod";

/**
 * 商品のバリデーションスキーマ
 */
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  imageUrl: z.string(),
  categoryId: z.string(),
  stock: z.number().int().min(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});
