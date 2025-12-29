/**
 * Cart Feature - カートアイテム
 */

"use client";

import { ProductImage, ProductPrice } from "@/entities/product";

import { useRemoveFromCart, useUpdateCartItem } from "../api/use-cart";

import type { CartItem as CartItemType } from "../model/cart.types";

interface CartItemProps {
  readonly item: CartItemType;
}

/**
 * カートアイテムコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.item - カートアイテムデータ
 * @returns カートアイテム要素
 */
export function CartItem({ item }: Readonly<CartItemProps>): React.JSX.Element {
  const { removeFromCart } = useRemoveFromCart();
  const { updateQuantity } = useUpdateCartItem();

  const handleQuantityChange = (delta: number): void => {
    updateQuantity(item.productId, item.quantity + delta);
  };

  const handleRemove = (): void => {
    removeFromCart(item.productId);
  };

  return (
    <div className="flex gap-4">
      <ProductImage
        src={item.imageUrl}
        alt={item.name}
        className="h-20 w-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <ProductPrice
          price={item.price}
          className="mt-1 text-sm"
        />
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => {
              handleQuantityChange(-1);
            }}
            className="rounded border px-2 py-1"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => {
              handleQuantityChange(1);
            }}
            className="rounded border px-2 py-1"
          >
            +
          </button>
          <button
            onClick={handleRemove}
            className="ml-auto text-sm text-red-600 hover:underline"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
