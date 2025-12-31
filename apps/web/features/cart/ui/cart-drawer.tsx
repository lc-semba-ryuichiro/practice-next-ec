/**
 * Cart Feature - カートドロワー
 */

"use client";

import Link from "next/link";

import { Button } from "@practice-next-ec/ui";

import { ROUTES } from "@/shared/config/routes";

import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { useCart } from "../api/use-cart";

interface CartDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/**
 * カートドロワーコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.isOpen - ドロワーが開いているかどうか
 * @param props.onClose - ドロワーを閉じるコールバック
 * @returns カートドロワー要素
 */
export function CartDrawer({
  isOpen,
  onClose,
}: Readonly<CartDrawerProps>): React.JSX.Element | null {
  const { cart, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        role="button"
        tabIndex={0}
        aria-label="カートを閉じる"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClose();
          }
        }}
      />
      <div className="relative w-full max-w-md bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">カート ({itemCount})</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {cart.items.length === 0 ? (
          <p className="mt-8 text-center text-gray-500">カートは空です</p>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {cart.items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                />
              ))}
            </div>

            <CartSummary className="mt-6" />

            <div className="mt-6 space-y-2">
              <Link
                href={ROUTES.CART}
                onClick={onClose}
              >
                <Button className="w-full">カートを見る</Button>
              </Link>
              <Link
                href={ROUTES.CHECKOUT}
                onClick={onClose}
              >
                <Button className="w-full">購入手続きへ</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
