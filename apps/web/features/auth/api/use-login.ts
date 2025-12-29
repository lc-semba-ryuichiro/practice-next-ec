/**
 * Auth Feature - Login Hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { login as loginApi } from "./auth.api";
import { sessionAtom } from "../model/auth.atoms";

import type { LoginCredentials, Session } from "../model/auth.types";
import type { UseMutationResult } from "@tanstack/react-query";

/**
 * ログイン mutation hook
 * @returns TanStack Query mutation
 */
export function useLogin(): UseMutationResult<Session, Error, LoginCredentials> {
  const queryClient = useQueryClient();
  const setSession = useSetAtom(sessionAtom);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (session: Session) => {
      setSession(session);
      // ユーザー関連のクエリを無効化
      void queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
