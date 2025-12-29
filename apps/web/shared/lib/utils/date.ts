/**
 * 日付フォーマットユーティリティ
 */

import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

/**
 * 日付を指定されたフォーマットで文字列に変換する
 * @param date - フォーマットする日付
 * @param formatString - フォーマット文字列
 * @returns フォーマットされた日付文字列
 * @example
 * ```ts
 * formatDate(new Date()); // "2024年1月1日"
 * formatDate(new Date(), "yyyy/MM/dd"); // "2024/01/01"
 * ```
 */
export function formatDate(date: Date | string | number, formatString = "yyyy年M月d日"): string {
  const dateObject = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return format(dateObject, formatString, { locale: ja });
}

/**
 * 日付を現在からの相対時間で表示する
 * @param date - 相対表示する日付
 * @returns 相対時間文字列
 * @example
 * ```ts
 * formatRelativeDate(new Date(Date.now() - 60000)); // "約1分前"
 * ```
 */
export function formatRelativeDate(date: Date | string | number): string {
  const dateObject = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return formatDistanceToNow(dateObject, { addSuffix: true, locale: ja });
}
