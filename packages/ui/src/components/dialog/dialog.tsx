import type * as React from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@ui/lib/utils";
import { XIcon } from "lucide-react";

/**
 * ダイアログのルートコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @returns ダイアログ要素
 */
function Dialog({
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Root>>): React.ReactElement {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      {...props}
    />
  );
}

/**
 * ダイアログを開くトリガーボタン
 * @param root0 - コンポーネントのプロパティ
 * @returns トリガー要素
 */
function DialogTrigger({
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Trigger>>): React.ReactElement {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...props}
    />
  );
}

/**
 * ダイアログコンテンツをポータルでレンダリングするコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @returns ポータル要素
 */
function DialogPortal({
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Portal>>): React.ReactElement {
  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      {...props}
    />
  );
}

/**
 * ダイアログを閉じるボタン
 * @param root0 - コンポーネントのプロパティ
 * @returns 閉じるボタン要素
 */
function DialogClose({
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Close>>): React.ReactElement {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...props}
    />
  );
}

/**
 * ダイアログの背景オーバーレイ
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns オーバーレイ要素
 */
function DialogOverlay({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Overlay>>): React.ReactElement {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * ダイアログのメインコンテンツ領域
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @param root0.children - 子要素
 * @param root0.showCloseButton - 閉じるボタンを表示するかどうか
 * @returns コンテンツ要素
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: Readonly<
  React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
  }
>): React.ReactElement {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * ダイアログのヘッダー部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns ヘッダー要素
 */
function DialogHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/**
 * ダイアログのフッター部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns フッター要素
 */
function DialogFooter({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

/**
 * ダイアログのタイトル
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns タイトル要素
 */
function DialogTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Title>>): React.ReactElement {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * ダイアログの説明文
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns 説明文要素
 */
function DialogDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Description>>): React.ReactElement {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
