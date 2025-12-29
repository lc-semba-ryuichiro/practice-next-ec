/**
 * Cart Feature - カートサマリー
 */

"use client";

import { cn } from "@practice-next-ec/lib";

import { formatCurrency } from "@/shared/lib/utils";

import { useCart } from "../api/use-cart";

interface CartSummaryProps {
  readonly className?: string;
}

/**
 * カートサマリーコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.className - 追加のCSSクラス
 * @returns カートサマリー要素
 */
export function CartSummary({ className }: Readonly<CartSummaryProps>): React.JSX.Element {
  const { total, itemCount } = useCart();

  return (
    <div className={cn("rounded-lg bg-gray-50 p-4", className)}>
      <div className="flex justify-between">
        <span>小計 ({itemCount}点)</span>
        <span className="font-bold">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
