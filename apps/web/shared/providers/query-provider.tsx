/**
 * TanStack Query Provider
 */

"use client";

import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/shared/api/query-client";

interface QueryProviderProps {
  readonly children: ReactNode;
}

/**
 * TanStack Query の Provider コンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.children - 子要素
 * @returns Provider でラップされた子要素
 */
export function QueryProvider({ children }: Readonly<QueryProviderProps>): React.JSX.Element {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
