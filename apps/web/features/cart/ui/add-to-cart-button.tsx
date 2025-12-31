/**
 * Cart Feature - カートに追加ボタン
 */

"use client";

import { Button } from "@practice-next-ec/ui";

import type { Product } from "@/entities/product";

import { useAddToCart } from "../api/use-cart";

interface AddToCartButtonProps {
  readonly product: Product;
  readonly quantity?: number;
}

/**
 * カートに追加ボタンコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.product - 追加する商品
 * @param props.quantity - 追加する数量
 * @returns カートに追加ボタン要素
 */
export function AddToCartButton({
  product,
  quantity = 1,
}: Readonly<AddToCartButtonProps>): React.JSX.Element {
  const { addToCart } = useAddToCart();

  const handleClick = (): void => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
  };

  return <Button onClick={handleClick}>カートに追加</Button>;
}
