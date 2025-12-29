/**
 * Order Entity - 注文ステータス
 */

import { cn } from "@practice-next-ec/lib";

import type { OrderStatusType } from "../model/order.types";

interface OrderStatusProps {
  readonly status: OrderStatusType;
  readonly className?: string;
}

const statusStyles: Record<OrderStatusType, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<OrderStatusType, string> = {
  pending: "注文受付",
  confirmed: "確認済み",
  processing: "処理中",
  shipped: "発送済み",
  delivered: "配達完了",
  cancelled: "キャンセル",
};

/**
 * 注文ステータスコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.status - 注文ステータス
 * @param props.className - 追加のCSSクラス
 * @returns 注文ステータス要素
 */
export function OrderStatus({ status, className }: Readonly<OrderStatusProps>): React.JSX.Element {
  // eslint-disable-next-line security/detect-object-injection -- Record型のインデックスアクセスは安全
  const style = statusStyles[status];
  // eslint-disable-next-line security/detect-object-injection -- Record型のインデックスアクセスは安全
  const label = statusLabels[status];
  return (
    <span
      className={cn("inline-block rounded-full px-3 py-1 text-sm font-medium", style, className)}
    >
      {label}
    </span>
  );
}
