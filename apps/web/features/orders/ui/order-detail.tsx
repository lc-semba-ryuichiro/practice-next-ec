/**
 * Orders Feature - 注文詳細
 */

"use client";

import { OrderStatus } from "@/entities/order";
import type { Order } from "@/entities/order";
import { ProductImage, ProductPrice } from "@/entities/product";
import { formatCurrency, formatDate } from "@/shared/lib/utils";

interface OrderDetailProps {
  readonly order: Order;
}

/**
 * 注文詳細コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.order - 注文データ
 * @returns 注文詳細要素
 */
export function OrderDetail({ order }: Readonly<OrderDetailProps>): React.JSX.Element {
  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">注文詳細</h1>
          <p className="mt-1 text-gray-500">注文番号: {order.id}</p>
          <p className="text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <OrderStatus status={order.status} />
      </div>

      {/* 商品一覧 */}
      <div className="rounded-lg border p-4">
        <h2 className="font-medium">注文商品</h2>
        <ul className="mt-4 space-y-4">
          {order.items.map((item) => (
            <li
              key={item.productId}
              className="flex gap-4"
            >
              <ProductImage
                src={item.imageUrl}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">数量: {item.quantity}</p>
              </div>
              <ProductPrice price={item.price * item.quantity} />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t pt-4 font-bold">
          <span>合計</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      {/* 配送先 */}
      <div className="rounded-lg border p-4">
        <h2 className="font-medium">配送先</h2>
        <p className="mt-2 text-gray-600">
          {order.shippingAddress.lastName} {order.shippingAddress.firstName}
          <br />〒{order.shippingAddress.postalCode}
          <br />
          {order.shippingAddress.prefecture}
          {order.shippingAddress.city}
          {order.shippingAddress.address1}
          {order.shippingAddress.address2 && <> {order.shippingAddress.address2}</>}
          <br />
          TEL: {order.shippingAddress.phone}
        </p>
      </div>
    </div>
  );
}
