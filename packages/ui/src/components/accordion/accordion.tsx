import type * as React from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@ui/lib/utils";
import { ChevronDownIcon } from "lucide-react";

/**
 * アコーディオンのルートコンポーネント。
 * @param props - AccordionPrimitive.Root に渡すプロパティ
 * @returns アコーディオンのルート要素
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>): React.ReactElement {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...props}
    />
  );
}

/**
 * アコーディオンの各項目を表すコンポーネント。
 * @param props - AccordionPrimitive.Item に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @returns アコーディオン項目要素
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>): React.ReactElement {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

/**
 * アコーディオンの開閉をトリガーするボタンコンポーネント。
 * @param props - AccordionPrimitive.Trigger に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.children - トリガー内に表示する子要素
 * @returns アコーディオントリガー要素
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>): React.ReactElement {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * アコーディオンの展開時に表示されるコンテンツコンポーネント。
 * @param props - AccordionPrimitive.Content に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.children - コンテンツ内に表示する子要素
 * @returns アコーディオンコンテンツ要素
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>): React.ReactElement {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
