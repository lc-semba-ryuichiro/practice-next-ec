/**
 * Checkout Feature - 注文確認
 */

"use client";

import { useRouter } from "next/navigation";

import { Button } from "@practice-next-ec/ui";

import { useCart } from "@/features/cart";
import { ROUTES } from "@/shared/config/routes";
import { formatCurrency } from "@/shared/lib/utils";

import { useCreateOrder } from "../api/use-create-order";

import type { PaymentMethod, ShippingAddress } from "../model/checkout.types";

interface OrderConfirmationProps {
  readonly shippingAddress: ShippingAddress;
  readonly paymentMethod: PaymentMethod;
  readonly onBack: () => void;
}

/**
 * 注文確認コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.shippingAddress - 配送先住所
 * @param props.paymentMethod - 支払い方法
 * @param props.onBack - 戻るボタンのコールバック
 * @returns 注文確認要素
 */
export function OrderConfirmation({
  shippingAddress,
  paymentMethod,
  onBack,
}: Readonly<OrderConfirmationProps>): React.JSX.Element {
  const router = useRouter();
  const { cart, total } = useCart();
  const { mutate: createOrder, isPending: isSubmitting } = useCreateOrder();

  const handleSubmit = (): void => {
    createOrder(
      { shippingAddress, paymentMethod },
      {
        onSuccess: (order) => {
          router.push(ROUTES.ORDERS.DETAIL(order.id));
        },
      }
    );
  };

  const paymentTypeLabel: Record<PaymentMethod["type"], string> = {
    credit_card: "クレジットカード",
    convenience_store: "コンビニ決済",
    bank_transfer: "銀行振込",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">ご注文内容の確認</h2>

      {/* 配送先 */}
      <div className="rounded-lg border p-4">
        <h3 className="font-medium">配送先</h3>
        <p className="mt-2 text-gray-600">
          {shippingAddress.lastName} {shippingAddress.firstName}
          <br />〒{shippingAddress.postalCode}
          <br />
          {shippingAddress.prefecture}
          {shippingAddress.city}
          {shippingAddress.address1}
          {shippingAddress.address2 && <> {shippingAddress.address2}</>}
          <br />
          TEL: {shippingAddress.phone}
        </p>
      </div>

      {/* 支払い方法 */}
      <div className="rounded-lg border p-4">
        <h3 className="font-medium">お支払い方法</h3>
        <p className="mt-2 text-gray-600">{paymentTypeLabel[paymentMethod.type]}</p>
      </div>

      {/* 注文内容 */}
      <div className="rounded-lg border p-4">
        <h3 className="font-medium">ご注文商品</h3>
        <ul className="mt-2 space-y-2">
          {cart.items.map((item) => (
            <li
              key={item.productId}
              className="flex justify-between"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t pt-4 font-bold">
          <span>合計</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          戻る
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="flex-1"
        >
          {isSubmitting ? "注文中..." : "注文を確定する"}
        </Button>
      </div>
    </div>
  );
}
