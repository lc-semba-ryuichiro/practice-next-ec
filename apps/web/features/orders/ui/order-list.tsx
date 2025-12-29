/**
 * Orders Feature - 注文一覧
 */

"use client";

import type { Order } from "@/entities/order";

import { OrderCard } from "./order-card";

interface OrderListProps {
  readonly orders: Array<Order>;
  readonly isLoading?: boolean;
}

/**
 * 注文一覧コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.orders - 注文リスト
 * @param props.isLoading - ローディング状態
 * @returns 注文一覧要素
 */
export function OrderList({
  orders,
  isLoading = false,
}: Readonly<OrderListProps>): React.JSX.Element {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return <div className="py-12 text-center text-gray-500">注文履歴がありません</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}
