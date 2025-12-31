import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@ui/lib/utils";
import { ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * パンくずリストのルートナビゲーション
 * @param root0 - コンポーネントのプロパティ
 * @returns ナビゲーション要素
 */
function Breadcrumb({ ...props }: Readonly<React.ComponentProps<"nav">>): React.ReactElement {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      {...props}
    />
  );
}

/**
 * パンくずリストの順序付きリスト
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns リスト要素
 */
function BreadcrumbList({
  className,
  ...props
}: Readonly<React.ComponentProps<"ol">>): React.ReactElement {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  );
}

/**
 * パンくずリストの各項目
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns リスト項目要素
 */
function BreadcrumbItem({
  className,
  ...props
}: Readonly<React.ComponentProps<"li">>): React.ReactElement {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

/**
 * パンくずリストのリンク
 * @param root0 - コンポーネントのプロパティ
 * @param root0.asChild - 子要素として直接レンダリングするかどうか
 * @param root0.className - 追加のCSSクラス名
 * @returns リンク要素
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: Readonly<
  React.ComponentProps<"a"> & {
    asChild?: boolean;
  }
>): React.ReactElement {
  const Comp = asChild === true ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

/**
 * パンくずリストの現在ページ表示
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns ページ表示要素
 */
function BreadcrumbPage({
  className,
  ...props
}: Readonly<React.ComponentProps<"span">>): React.ReactElement {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

/**
 * パンくずリストの区切り記号
 * @param root0 - コンポーネントのプロパティ
 * @param root0.children - カスタム区切り記号の子要素
 * @param root0.className - 追加のCSSクラス名
 * @returns 区切り記号要素
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: Readonly<React.ComponentProps<"li">>): React.ReactElement {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * パンくずリストの省略記号
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns 省略記号要素
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: Readonly<React.ComponentProps<"span">>): React.ReactElement {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
