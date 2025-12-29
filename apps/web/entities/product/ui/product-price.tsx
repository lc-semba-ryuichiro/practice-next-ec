/**
 * Product Entity - 商品価格
 */

import { cn } from "@practice-next-ec/lib";

import { formatProductPrice } from "../lib/product.utils";

interface ProductPriceProps {
  readonly price: number;
  readonly originalPrice?: number;
  readonly className?: string;
}

/**
 * 商品価格コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.price - 現在の価格
 * @param props.originalPrice - 元の価格（割引前）
 * @param props.className - 追加のCSSクラス
 * @returns 商品価格要素
 */
export function ProductPrice({
  price,
  originalPrice,
  className,
}: Readonly<ProductPriceProps>): React.JSX.Element {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-bold">{formatProductPrice(price)}</span>
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through">
          {formatProductPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
