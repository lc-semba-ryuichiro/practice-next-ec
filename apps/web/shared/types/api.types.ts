/**
 * API 関連の共通型定義
 */

/**
 * API エラーレスポンスの型
 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * ページネーションパラメータ
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * ページネーション付きレスポンスの型
 */
export interface PaginatedResponse<T> {
  data: Array<T>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
