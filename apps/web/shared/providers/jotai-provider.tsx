/**
 * Jotai Provider
 */

"use client";

import type { ReactNode } from "react";

import { Provider as JotaiBaseProvider } from "jotai";

interface JotaiProviderProps {
  readonly children: ReactNode;
}

/**
 * Jotai の Provider コンポーネント
 *
 * App Router で Jotai を使用する場合、
 * Provider でラップすることで各リクエストで独立した store を持つ
 * @param props - コンポーネントプロパティ
 * @param props.children - 子要素
 * @returns Provider でラップされた子要素
 */
export function JotaiProvider({ children }: Readonly<JotaiProviderProps>): React.JSX.Element {
  return <JotaiBaseProvider>{children}</JotaiBaseProvider>;
}
