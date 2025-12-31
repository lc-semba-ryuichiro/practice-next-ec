import type * as React from "react";

import { cn } from "@ui/lib/utils";

/**
 * データテーブルのルートコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns テーブル要素
 */
function Table({
  className,
  ...props
}: Readonly<React.ComponentProps<"table">>): React.ReactElement {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      {/* eslint-disable-next-line sonarjs/table-header -- Table header is provided by TableHeader component when used */}
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

/**
 * テーブルのヘッダー部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns ヘッダー要素
 */
function TableHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<"thead">>): React.ReactElement {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

/**
 * テーブルの本体部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns 本体要素
 */
function TableBody({
  className,
  ...props
}: Readonly<React.ComponentProps<"tbody">>): React.ReactElement {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/**
 * テーブルのフッター部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns フッター要素
 */
function TableFooter({
  className,
  ...props
}: Readonly<React.ComponentProps<"tfoot">>): React.ReactElement {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}

/**
 * テーブルの各行
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns 行要素
 */
function TableRow({
  className,
  ...props
}: Readonly<React.ComponentProps<"tr">>): React.ReactElement {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

/**
 * テーブルのヘッダーセル
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns ヘッダーセル要素
 */
function TableHead({
  className,
  ...props
}: Readonly<React.ComponentProps<"th">>): React.ReactElement {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

/**
 * テーブルのデータセル
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns データセル要素
 */
function TableCell({
  className,
  ...props
}: Readonly<React.ComponentProps<"td">>): React.ReactElement {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

/**
 * テーブルのキャプション
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns キャプション要素
 */
function TableCaption({
  className,
  ...props
}: Readonly<React.ComponentProps<"caption">>): React.ReactElement {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
