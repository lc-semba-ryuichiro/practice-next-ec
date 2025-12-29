/**
 * Product Entity - 商品バッジ
 */

import { cn } from "@practice-next-ec/lib";

type BadgeVariant = "new" | "sale" | "soldout";

interface ProductBadgeProps {
  readonly variant: BadgeVariant;
  readonly className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-blue-500 text-white",
  sale: "bg-red-500 text-white",
  soldout: "bg-gray-500 text-white",
};

const variantLabels: Record<BadgeVariant, string> = {
  new: "NEW",
  sale: "SALE",
  soldout: "売り切れ",
};

/**
 * 商品バッジコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.variant - バッジのバリエーション
 * @param props.className - 追加のCSSクラス
 * @returns 商品バッジ要素
 */
export function ProductBadge({
  variant,
  className,
}: Readonly<ProductBadgeProps>): React.JSX.Element {
  // eslint-disable-next-line security/detect-object-injection -- Record型のインデックスアクセスは安全
  const style = variantStyles[variant];
  // eslint-disable-next-line security/detect-object-injection -- Record型のインデックスアクセスは安全
  const label = variantLabels[variant];
  return (
    <span className={cn("inline-block rounded px-2 py-1 text-xs font-bold", style, className)}>
      {label}
    </span>
  );
}
