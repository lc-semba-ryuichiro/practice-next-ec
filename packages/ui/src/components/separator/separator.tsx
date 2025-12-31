import type * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@ui/lib/utils";

/**
 * コンテンツを視覚的に分離する区切り線コンポーネント。
 * @param props - SeparatorPrimitive.Root に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.orientation - 区切り線の方向（horizontal または vertical）
 * @param props.decorative - true の場合、装飾目的として扱う
 * @returns 区切り線要素
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: Readonly<React.ComponentProps<typeof SeparatorPrimitive.Root>>): React.ReactElement {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
