/**
 * アプリケーション定数
 */

export const APP_CONFIG = {
  /** アプリケーション名 */
  APP_NAME: "Practice EC",

  /** デフォルトのロケール */
  DEFAULT_LOCALE: "ja",

  /** サポートするロケール */
  SUPPORTED_LOCALES: ["ja", "en"] as const,

  /** ページネーションのデフォルトサイズ */
  DEFAULT_PAGE_SIZE: 20,

  /** 最大ページサイズ */
  MAX_PAGE_SIZE: 100,

  /** カートの最大アイテム数 */
  MAX_CART_ITEMS: 99,
} as const;

export type SupportedLocale = (typeof APP_CONFIG.SUPPORTED_LOCALES)[number];
