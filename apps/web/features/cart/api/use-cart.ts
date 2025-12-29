/**
 * Cart Feature - Cart Hooks
 */

import { useAtomValue, useSetAtom } from "jotai";

import { cartAtom, cartItemCountAtom, cartTotalAtom } from "../model/cart.atoms";

import type { Cart } from "../model/cart.types";

interface UseCartReturn {
  cart: Cart;
  itemCount: number;
  total: number;
}

/**
 * カート状態を取得する hook
 * @returns カート情報
 */
export function useCart(): UseCartReturn {
  const cart = useAtomValue(cartAtom);
  const itemCount = useAtomValue(cartItemCountAtom);
  const total = useAtomValue(cartTotalAtom);

  return { cart, itemCount, total };
}

interface AddToCartParams {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

interface UseAddToCartReturn {
  addToCart: (params: AddToCartParams) => void;
}

/**
 * カートに商品を追加する hook
 * @returns カート追加関数
 */
export function useAddToCart(): UseAddToCartReturn {
  const setCart = useSetAtom(cartAtom);

  const addToCart = (params: AddToCartParams): void => {
    const { productId, name, price, imageUrl, quantity = 1 } = params;

    setCart((previous) => {
      const existingItem = previous.items.find((item) => item.productId === productId);

      if (existingItem) {
        return {
          ...previous,
          items: previous.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
          ),
          updatedAt: Date.now(),
        };
      }

      return {
        ...previous,
        items: [...previous.items, { productId, name, price, imageUrl, quantity }],
        updatedAt: Date.now(),
      };
    });
  };

  return { addToCart };
}

interface UseRemoveFromCartReturn {
  removeFromCart: (productId: string) => void;
}

/**
 * カートから商品を削除する hook
 * @returns カート削除関数
 */
export function useRemoveFromCart(): UseRemoveFromCartReturn {
  const setCart = useSetAtom(cartAtom);

  const removeFromCart = (productId: string): void => {
    setCart((previous) => ({
      ...previous,
      items: previous.items.filter((item) => item.productId !== productId),
      updatedAt: Date.now(),
    }));
  };

  return { removeFromCart };
}

interface UseUpdateCartItemReturn {
  updateQuantity: (productId: string, quantity: number) => void;
}

/**
 * カートアイテムの数量を更新する hook
 * @returns 数量更新関数
 */
export function useUpdateCartItem(): UseUpdateCartItemReturn {
  const setCart = useSetAtom(cartAtom);

  const updateQuantity = (productId: string, quantity: number): void => {
    if (quantity <= 0) {
      setCart((previous) => ({
        ...previous,
        items: previous.items.filter((item) => item.productId !== productId),
        updatedAt: Date.now(),
      }));
      return;
    }

    setCart((previous) => ({
      ...previous,
      items: previous.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
      updatedAt: Date.now(),
    }));
  };

  return { updateQuantity };
}
