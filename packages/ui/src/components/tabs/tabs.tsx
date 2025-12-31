import type * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@ui/lib/utils";

/**
 * タブナビゲーションのルートコンポーネント。
 * @param props - TabsPrimitive.Root に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns タブのルート要素
 */
function Tabs({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof TabsPrimitive.Root>>): React.ReactElement {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

/**
 * タブトリガーを格納するリストコンポーネント。
 * @param props - TabsPrimitive.List に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns タブリスト要素
 */
function TabsList({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof TabsPrimitive.List>>): React.ReactElement {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

/**
 * タブを切り替えるトリガーボタンコンポーネント。
 * @param props - TabsPrimitive.Trigger に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns タブトリガー要素
 */
function TabsTrigger({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof TabsPrimitive.Trigger>>): React.ReactElement {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

/**
 * 選択されたタブに対応するコンテンツを表示するコンポーネント。
 * @param props - TabsPrimitive.Content に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns タブコンテンツ要素
 */
function TabsContent({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof TabsPrimitive.Content>>): React.ReactElement {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
