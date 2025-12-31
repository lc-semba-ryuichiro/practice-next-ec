import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button.variants";

/**
 * 汎用ボタンコンポーネント。
 * @param props - button 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.variant - ボタンのスタイルバリアント（default, destructive, outline, secondary, ghost, link）
 * @param props.size - ボタンのサイズ（default, sm, lg, icon, icon-sm, icon-lg）
 * @param props.asChild - true の場合、子要素をそのままレンダリング
 * @returns ボタン要素
 */
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: Readonly<
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>): React.ReactElement {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
