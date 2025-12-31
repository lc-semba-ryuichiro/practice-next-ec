import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";

import { badgeVariants } from "./badge.variants";

/**
 * バッジコンポーネント。
 * @param props - span 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.variant - バッジのスタイルバリアント（default, secondary, destructive, outline）
 * @param props.asChild - true の場合、子要素をそのままレンダリング
 * @returns バッジ要素
 */
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: Readonly<
  React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & {
      asChild?: boolean;
    }
>): React.ReactElement {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
