/**
 * User Entity - Zod バリデーションスキーマ
 */

import { z } from "zod";

/**
 * ユーザーのバリデーションスキーマ
 */
export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().min(1),
  avatarUrl: z.string().optional(),
  createdAt: z.string(),
});
