import type * as React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@ui/lib/utils";

/**
 * ユーザーアバターのルートコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns アバター要素
 */
function Avatar({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AvatarPrimitive.Root>>): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
}

/**
 * アバターの画像コンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns アバター画像要素
 */
function AvatarImage({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AvatarPrimitive.Image>>): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

/**
 * アバター画像のフォールバックコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns フォールバック要素
 */
function AvatarFallback({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AvatarPrimitive.Fallback>>): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
