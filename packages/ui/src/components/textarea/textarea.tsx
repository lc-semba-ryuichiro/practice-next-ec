import type * as React from "react";

import { cn } from "@ui/lib/utils";

/**
 * 複数行テキスト入力用のテキストエリアコンポーネント。
 * @param props - textarea 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns テキストエリア要素
 */
function Textarea({
  className,
  ...props
}: Readonly<React.ComponentProps<"textarea">>): React.ReactElement {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
