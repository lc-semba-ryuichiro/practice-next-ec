import * as React from "react";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { toggleVariants } from "@ui/components/toggle/toggle.variants";
import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
});

/**
 * 複数のトグルをグループ化するコンテナコンポーネント。
 * @param props - ToggleGroupPrimitive.Root に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.variant - トグルのスタイルバリアント
 * @param props.size - トグルのサイズ
 * @param props.spacing - トグル間の間隔
 * @param props.children - グループ内のトグル項目
 * @returns トグルグループ要素
 */
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: Readonly<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      spacing?: number;
    }
>): React.ReactElement {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

/**
 * トグルグループ内の個々のトグル項目コンポーネント。
 * @param props - ToggleGroupPrimitive.Item に渡すプロパティ
 * @param props.className - 追加の CSS クラス名
 * @param props.children - トグル内に表示する子要素
 * @param props.variant - トグルのスタイルバリアント（親グループから継承可能）
 * @param props.size - トグルのサイズ（親グループから継承可能）
 * @returns トグルグループ項目要素
 */
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: Readonly<
  React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>): React.ReactElement {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
