/**
 * Auth Feature - Jotai Atoms
 */

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { Session } from "./auth.types";

/**
 * セッション状態を管理する atom
 * localStorage に永続化
 */
export const sessionAtom = atomWithStorage<Session | null>("session", null);

/**
 * 認証済みかどうかを判定する derived atom
 */
export const isAuthenticatedAtom = atom((get) => {
  const session = get(sessionAtom);
  if (!session) return false;

  // トークンの有効期限チェック
  const isExpired = Date.now() > session.expiresAt;
  return !isExpired;
});
