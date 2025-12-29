/**
 * Auth Feature - API クライアント
 */

import { apiClient } from "@/shared/api/client";

import type { LoginCredentials, RegisterData, Session } from "../model/auth.types";

/**
 * ログイン API 呼び出し
 * @param credentials - ログイン認証情報
 * @returns セッション情報
 */
export async function login(credentials: LoginCredentials): Promise<Session> {
  const response = await apiClient.post<Session>("/auth/login", credentials);
  return response.data;
}

/**
 * ユーザー登録 API 呼び出し
 * @param data - 登録データ
 * @returns セッション情報
 */
export async function register(data: RegisterData): Promise<Session> {
  const response = await apiClient.post<Session>("/auth/register", data);
  return response.data;
}

/**
 * ログアウト API 呼び出し
 */
export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

/**
 * セッション検証 API 呼び出し
 * @returns セッション情報（無効な場合は null）
 */
export async function validateSession(): Promise<Session | null> {
  try {
    const response = await apiClient.get<Session>("/auth/session");
    return response.data;
  } catch {
    return null;
  }
}
