/**
 * 環境変数の型安全な定義
 * @see https://env.t3.gg/docs/nextjs
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * サーバーサイド環境変数
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * クライアントサイド環境変数
   * NEXT_PUBLIC_ プレフィックスが必要
   */
  client: {
    NEXT_PUBLIC_API_URL: z.url().optional(),
    NEXT_PUBLIC_APP_URL: z.url().optional(),
  },

  /**
   * 実行時の環境変数マッピング
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env["NEXT_PUBLIC_API_URL"],
    NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
  },

  /**
   * ビルド時にクライアント変数が欠落していてもエラーにしない
   */
  skipValidation: Boolean(process.env["SKIP_ENV_VALIDATION"]),

  /**
   * 空文字列を undefined として扱う
   */
  emptyStringAsUndefined: true,
});
