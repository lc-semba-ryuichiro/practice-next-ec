import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS クラスを結合するユーティリティ関数。
 * clsx と tailwind-merge を組み合わせて、クラスの競合を解決する。
 * @param inputs - 結合する CSS クラス値の配列
 * @returns 結合された CSS クラス文字列
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
