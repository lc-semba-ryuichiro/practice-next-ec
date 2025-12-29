/**
 * Auth Feature - Session Hook
 */

import { useAtomValue } from "jotai";

import { isAuthenticatedAtom, sessionAtom } from "../model/auth.atoms";

import type { Session } from "../model/auth.types";

interface UseSessionReturn {
  session: Session | null;
  isAuthenticated: boolean;
}

/**
 * セッション状態を取得する hook
 * @returns セッション情報と認証状態
 */
export function useSession(): UseSessionReturn {
  const session = useAtomValue(sessionAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return {
    session,
    isAuthenticated,
  };
}
