/**
 * アプリケーションルート定義
 *
 * 型安全なルーティングのための定数
 */

export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },

  PRODUCTS: {
    LIST: "/products",
    DETAIL: (id: string) => `/products/${id}` as const,
  },

  CART: "/cart",

  CHECKOUT: "/checkout",

  ORDERS: {
    LIST: "/orders",
    DETAIL: (id: string) => `/orders/${id}` as const,
  },
} as const;

/**
 * ルートのタイプ定義
 */
export type AppRoutes = typeof ROUTES;
