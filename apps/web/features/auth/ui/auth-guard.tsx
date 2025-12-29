/**
 * Auth Feature - 認証ガード
 */

"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/shared/config/routes";

import { useSession } from "../api/use-session";

interface AuthGuardProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}

/**
 * 認証ガードコンポーネント
 *
 * 認証されていない場合はログインページにリダイレクト
 * @param props - コンポーネントプロパティ
 * @param props.children - 認証後に表示するコンテンツ
 * @param props.fallback - 認証中に表示するフォールバック
 * @returns 認証済みの場合は children、それ以外は fallback
 */
export function AuthGuard({
  children,
  fallback,
}: Readonly<AuthGuardProps>): React.JSX.Element | null {
  const router = useRouter();
  const { isAuthenticated } = useSession();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return fallback !== undefined ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
