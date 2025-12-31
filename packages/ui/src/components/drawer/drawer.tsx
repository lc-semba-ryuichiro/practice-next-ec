import type * as React from "react";

import { cn } from "@ui/lib/utils";
import { Drawer as DrawerPrimitive } from "vaul";

/**
 * ドロワーのルートコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @returns ドロワー要素
 */
function Drawer({
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Root>>): React.ReactElement {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      {...props}
    />
  );
}

/**
 * ドロワーを開くトリガーボタン
 * @param root0 - コンポーネントのプロパティ
 * @returns トリガー要素
 */
function DrawerTrigger({
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Trigger>>): React.ReactElement {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      {...props}
    />
  );
}

/**
 * ドロワーコンテンツをポータルでレンダリングするコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @returns ポータル要素
 */
function DrawerPortal({
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Portal>>): React.ReactElement {
  return (
    <DrawerPrimitive.Portal
      data-slot="drawer-portal"
      {...props}
    />
  );
}

/**
 * ドロワーを閉じるボタン
 * @param root0 - コンポーネントのプロパティ
 * @returns 閉じるボタン要素
 */
function DrawerClose({
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Close>>): React.ReactElement {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      {...props}
    />
  );
}

/**
 * ドロワーの背景オーバーレイ
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns オーバーレイ要素
 */
function DrawerOverlay({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Overlay>>): React.ReactElement {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * ドロワーのメインコンテンツ領域
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @param root0.children - 子要素
 * @returns コンテンツ要素
 */
function DrawerContent({
  className,
  children,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Content>>): React.ReactElement {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/**
 * ドロワーのヘッダー部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns ヘッダー要素
 */
function DrawerHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  );
}

/**
 * ドロワーのフッター部分
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns フッター要素
 */
function DrawerFooter({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

/**
 * ドロワーのタイトル
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns タイトル要素
 */
function DrawerTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Title>>): React.ReactElement {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

/**
 * ドロワーの説明文
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns 説明文要素
 */
function DrawerDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Description>>): React.ReactElement {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
