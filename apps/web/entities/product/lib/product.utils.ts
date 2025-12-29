/**
 * Product Entity - ユーティリティ関数
 */

import type { Product } from "../model/product.types";

/**
 * 商品価格をフォーマットする
 * @param price - 価格
 * @returns フォーマットされた価格文字列
 */
export function formatProductPrice(price: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(price);
}

/**
 * 商品が在庫ありかどうかを判定する
 * @param product - 商品
 * @returns 在庫があれば true
 */
export function isProductInStock(product: Product): boolean {
  return product.stock > 0;
}
