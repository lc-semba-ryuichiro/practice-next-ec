/**
 * アプリケーション全体の Provider 統合
 */

"use client";

import type { ReactNode } from "react";

import { JotaiProvider } from "./jotai-provider";
import { QueryProvider } from "./query-provider";

interface AppProvidersProps {
  readonly children: ReactNode;
}

/**
 * アプリケーション全体で必要な Provider を統合するコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.children - 子要素
 * @returns Provider でラップされた子要素
 * @example
 * ```tsx
 * // app/layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AppProviders>{children}</AppProviders>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function AppProviders({ children }: Readonly<AppProvidersProps>): React.JSX.Element {
  return (
    <JotaiProvider>
      <QueryProvider>{children}</QueryProvider>
    </JotaiProvider>
  );
}
