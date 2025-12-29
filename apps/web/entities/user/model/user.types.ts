/**
 * User Entity - 型定義
 */

/**
 * ユーザー
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}
