import type * as React from "react";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@ui/lib/utils";

import { buttonVariants } from "../button/button.variants";

/**
 * 確認ダイアログのルートコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @returns アラートダイアログ要素
 */
function AlertDialog({
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Root>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Root
      data-slot="alert-dialog"
      {...props}
    />
  );
}

/**
 * 確認ダイアログを開くトリガーボタン
 * @param root0 - コンポーネントのプロパティ
 * @returns トリガー要素
 */
function AlertDialogTrigger({
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Trigger>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

/**
 * 確認ダイアログのポータルコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @returns ポータル要素
 */
function AlertDialogPortal({
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Portal>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}

/**
 * 確認ダイアログの背景オーバーレイ
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns オーバーレイ要素
 */
function AlertDialogOverlay({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Overlay>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * 確認ダイアログのコンテンツ領域
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns コンテンツ要素
 */
function AlertDialogContent({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Content>>): React.ReactElement {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

/**
 * 確認ダイアログのヘッダー部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns ヘッダー要素
 */
function AlertDialogHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/**
 * 確認ダイアログのフッター部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns フッター要素
 */
function AlertDialogFooter({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

/**
 * 確認ダイアログのタイトル
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns タイトル要素
 */
function AlertDialogTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Title>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

/**
 * 確認ダイアログの説明文
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns 説明要素
 */
function AlertDialogDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Description>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * 確認ダイアログの確定アクションボタン
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns アクションボタン要素
 */
function AlertDialogAction({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Action>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

/**
 * 確認ダイアログのキャンセルボタン
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns キャンセルボタン要素
 */
function AlertDialogCancel({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Cancel>>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
