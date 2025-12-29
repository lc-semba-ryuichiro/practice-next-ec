/**
 * TanStack Query クライアント設定
 */

import { QueryClient, isServer } from "@tanstack/react-query";

/**
 * QueryClient インスタンスを作成する
 * @returns 設定済みの QueryClient インスタンス
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR では即座にリフェッチしない
        staleTime: 60 * 1000,
        // リトライ設定
        retry: 1,
        // エラー時のリフェッチ無効化
        refetchOnWindowFocus: false,
      },
    },
  });
}

// eslint-disable-next-line functional/no-let -- シングルトンパターンのため
let browserQueryClient: QueryClient | undefined;

/**
 * QueryClient を取得する
 * サーバーサイドでは毎回新しいインスタンスを作成
 * クライアントサイドではシングルトンを使用
 * @returns QueryClient インスタンス
 */
export function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient();
  }
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}

export const queryClient = getQueryClient();
