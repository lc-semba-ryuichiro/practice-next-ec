/**
 * Orders Feature - 注文カード
 */

import Link from "next/link";

import { OrderStatus } from "@/entities/order";
import type { Order } from "@/entities/order";
import { ROUTES } from "@/shared/config/routes";
import { formatCurrency, formatDate } from "@/shared/lib/utils";

interface OrderCardProps {
  readonly order: Order;
}

/**
 * 注文カードコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.order - 注文データ
 * @returns 注文カード要素
 */
export function OrderCard({ order }: Readonly<OrderCardProps>): React.JSX.Element {
  return (
    <Link
      href={ROUTES.ORDERS.DETAIL(order.id)}
      className="block rounded-lg border p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">注文番号: {order.id}</p>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <OrderStatus status={order.status} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">{order.items.length}点の商品</span>
        <span className="font-bold">{formatCurrency(order.total)}</span>
      </div>
    </Link>
  );
}
