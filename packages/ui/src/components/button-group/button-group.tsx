import { Slot } from "@radix-ui/react-slot";
import { Separator } from "@ui/components/separator/separator";
import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";

import { buttonGroupVariants } from "./button-group.variants";

/**
 * ボタンをグループ化して表示するコンテナコンポーネント。
 * @param props - div 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.orientation - ボタンの配置方向（horizontal または vertical）
 * @returns ボタングループ要素
 */
function ButtonGroup({
  className,
  orientation,
  ...props
}: Readonly<
  React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>
>): React.ReactElement {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

/**
 * ボタングループ内にテキストを表示するコンポーネント。
 * @param props - div 要素に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.asChild - true の場合、子要素をそのままレンダリング
 * @returns ボタングループテキスト要素
 */
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: Readonly<
  React.ComponentProps<"div"> & {
    asChild?: boolean;
  }
>): React.ReactElement {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

/**
 * ボタングループ内の区切り線コンポーネント。
 * @param props - Separator に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.orientation - 区切り線の方向（デフォルト: vertical）
 * @returns ボタングループ区切り線要素
 */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: Readonly<React.ComponentProps<typeof Separator>>): React.ReactElement {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
