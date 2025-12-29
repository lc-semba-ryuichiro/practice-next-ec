/**
 * Auth Feature - Register Hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { register as registerApi } from "./auth.api";
import { sessionAtom } from "../model/auth.atoms";

import type { RegisterData, Session } from "../model/auth.types";
import type { UseMutationResult } from "@tanstack/react-query";

/**
 * ユーザー登録 mutation hook
 * @returns TanStack Query mutation
 */
export function useRegister(): UseMutationResult<Session, Error, RegisterData> {
  const queryClient = useQueryClient();
  const setSession = useSetAtom(sessionAtom);

  return useMutation({
    mutationFn: (data: RegisterData) => registerApi(data),
    onSuccess: (session: Session) => {
      setSession(session);
      // ユーザー関連のクエリを無効化
      void queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
