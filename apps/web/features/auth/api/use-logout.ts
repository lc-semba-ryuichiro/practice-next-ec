/**
 * Auth Feature - Logout Hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { logout as logoutApi } from "./auth.api";
import { sessionAtom } from "../model/auth.atoms";

import type { UseMutationResult } from "@tanstack/react-query";

/**
 * ログアウト mutation hook
 * @returns TanStack Query mutation
 */
export function useLogout(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();
  const setSession = useSetAtom(sessionAtom);

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setSession(null);
      // 全てのクエリをクリア
      queryClient.clear();
    },
  });
}
