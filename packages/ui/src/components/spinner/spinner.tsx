import type * as React from "react";

import { cn } from "@ui/lib/utils";
import { Loader2Icon } from "lucide-react";

/**
 * ローディング状態を示すスピナーコンポーネント。
 * @param props - svg 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns スピナー要素
 */
function Spinner({
  className,
  ...props
}: Readonly<React.ComponentProps<"svg">>): React.ReactElement {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
