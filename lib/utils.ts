import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS クラス名をマージするユーティリティ関数
 * clsx と tailwind-merge を組み合わせて、重複するクラスを適切に処理する
 * @param inputs - マージするクラス名の配列
 * @returns マージされたクラス名文字列
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
