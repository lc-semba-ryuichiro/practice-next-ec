/**
 * Auth Feature - Zod バリデーションスキーマ
 */

import { z } from "zod";

/**
 * ログインフォームの入力型
 * Zod 4 との互換性のため明示的に定義
 */
export interface LoginFormInput {
  readonly email: string;
  readonly password: string;
}

/**
 * 登録フォームの入力型
 * Zod 4 との互換性のため明示的に定義
 */
export interface RegisterFormInput {
  readonly email: string;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly name: string;
}

/**
 * ログインフォームのバリデーションスキーマ
 */
export const loginSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

/**
 * 登録フォームのバリデーションスキーマ
 */
export const registerSchema = z
  .object({
    email: z.email("有効なメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上で入力してください"),
    passwordConfirm: z.string().min(1, "確認用パスワードは必須です"),
    name: z.string().min(1, "名前は必須です"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "パスワードが一致しません",
    path: ["passwordConfirm"],
  });

/**
 * ログインスキーマの型
 * @deprecated LoginFormInput を使用してください
 */
export type LoginSchemaType = LoginFormInput;

/**
 * 登録スキーマの型
 * @deprecated RegisterFormInput を使用してください
 */
export type RegisterSchemaType = RegisterFormInput;
