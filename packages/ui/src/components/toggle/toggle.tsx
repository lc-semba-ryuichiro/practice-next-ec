import type * as React from "react";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";

import { toggleVariants } from "./toggle.variants";

/**
 * オン/オフ状態を切り替えるトグルボタンコンポーネント。
 * @param props - TogglePrimitive.Root に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.variant - トグルのスタイルバリアント（default または outline）
 * @param props.size - トグルのサイズ（default, sm, lg）
 * @returns トグル要素
 */
function Toggle({
  className,
  variant,
  size,
  ...props
}: Readonly<
  React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>): React.ReactElement {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle };
