import type * as React from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@ui/lib/utils";

/**
 * ツールチップのプロバイダーコンポーネント。
 * @param props - TooltipPrimitive.Provider に渡すプロパティ
 * @param props.delayDuration - ツールチップ表示までの遅延時間（ミリ秒）
 * @returns ツールチッププロバイダー要素
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Provider>>): React.ReactElement {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * ツールチップのルートコンポーネント。
 * @param props - TooltipPrimitive.Root に渡すプロパティ
 * @returns ツールチップ要素
 */
function Tooltip({
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Root>>): React.ReactElement {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        {...props}
      />
    </TooltipProvider>
  );
}

/**
 * ツールチップを表示するトリガー要素。
 * @param props - TooltipPrimitive.Trigger に渡すプロパティ
 * @returns ツールチップトリガー要素
 */
function TooltipTrigger({
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Trigger>>): React.ReactElement {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}

/**
 * ツールチップの内容を表示するコンポーネント。
 * @param props - TooltipPrimitive.Content に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.sideOffset - トリガーからのオフセット距離
 * @param props.children - ツールチップ内に表示する子要素
 * @returns ツールチップコンテンツ要素
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Content>>): React.ReactElement {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
