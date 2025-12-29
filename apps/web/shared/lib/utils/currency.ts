/**
 * 通貨フォーマットユーティリティ
 */

interface FormatCurrencyOptions {
  locale?: string;
  currency?: string;
}

/**
 * 数値を通貨形式にフォーマットする
 * @param amount - フォーマットする金額
 * @param options - フォーマットオプション
 * @returns フォーマットされた通貨文字列
 * @example
 * ```ts
 * formatCurrency(1234); // "¥1,234"
 * formatCurrency(1234, { locale: "en-US", currency: "USD" }); // "$1,234.00"
 * ```
 */
export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
  const { locale = "ja-JP", currency = "JPY" } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
