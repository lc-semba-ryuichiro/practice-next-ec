/**
 * Auth Feature - ログアウトボタン
 */

"use client";

import { Button } from "@practice-next-ec/ui";

import { useLogout } from "../api/use-logout";

interface LogoutButtonProps {
  readonly onSuccess?: () => void;
}

/**
 * ログアウトボタンコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.onSuccess - ログアウト成功時のコールバック
 * @returns ログアウトボタン要素
 */
export function LogoutButton({ onSuccess }: Readonly<LogoutButtonProps>): React.JSX.Element {
  const { mutate: logout, isPending: isLoading } = useLogout();

  const handleClick = (): void => {
    logout(undefined, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <Button
      label={isLoading ? "ログアウト中..." : "ログアウト"}
      onClick={handleClick}
    />
  );
}
