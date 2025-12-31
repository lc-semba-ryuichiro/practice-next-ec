import type * as React from "react";

import { cn } from "@ui/lib/utils";

/**
 * コンテンツをグループ化するカードコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns カード要素
 */
function Card({ className, ...props }: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

/**
 * カードのヘッダー部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns ヘッダー要素
 */
function CardHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

/**
 * カードのタイトル
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns タイトル要素
 */
function CardTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * カードの説明文
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns 説明要素
 */
function CardDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * カードのアクション領域
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns アクション要素
 */
function CardAction({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

/**
 * カードのメインコンテンツ領域
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns コンテンツ要素
 */
function CardContent({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

/**
 * カードのフッター部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns フッター要素
 */
function CardFooter({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
