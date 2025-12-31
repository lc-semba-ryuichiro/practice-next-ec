import type * as React from "react";

import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";

import { alertVariants } from "./alert.variants";

/**
 * アラートコンポーネント。
 * @param props - div 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.variant - アラートのスタイルバリアント（default, destructive）
 * @returns アラート要素
 */
function Alert({
  className,
  variant = "default",
  ...props
}: Readonly<React.ComponentProps<"div"> & VariantProps<typeof alertVariants>>): React.ReactElement {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * アラートタイトルコンポーネント。
 * @param props - div 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns アラートタイトル要素
 */
function AlertTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props}
    />
  );
}

/**
 * アラート説明コンポーネント。
 * @param props - div 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns アラート説明要素
 */
function AlertDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
