/**
 * Auth Feature - 型定義
 */

/**
 * ログイン認証情報
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * ユーザー登録データ
 */
export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

/**
 * セッション情報
 */
export interface Session {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

/**
 * 認証ユーザー情報
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}
