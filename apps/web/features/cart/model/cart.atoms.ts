/**
 * Cart Feature - Jotai Atoms
 */

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { Cart } from "./cart.types";

/**
 * カート状態を管理する atom
 * localStorage に永続化
 */
export const cartAtom = atomWithStorage<Cart>("cart", {
  items: [],
  updatedAt: Date.now(),
});

/**
 * カート内のアイテム数を計算する derived atom
 */
export const cartItemCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.items.reduce((total, item) => total + item.quantity, 0);
});

/**
 * カートの合計金額を計算する derived atom
 */
export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
});
