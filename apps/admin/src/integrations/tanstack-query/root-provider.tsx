import { TRPCProvider } from "@/integrations/trpc/react";

import { trpcClient } from "./client";

import type { QueryClient } from "@tanstack/react-query";

/** Props for the Provider component. */
interface ProviderProps {
  readonly children: React.ReactNode;
  readonly queryClient: QueryClient;
}

/**
 * Provides TanStack Query and tRPC context to the application.
 * @param props - The provider props
 * @param props.children - The children to render
 * @param props.queryClient - The QueryClient instance
 * @returns The provider component wrapping children
 */
export function Provider({ children, queryClient }: Readonly<ProviderProps>): React.JSX.Element {
  return (
    <TRPCProvider
      trpcClient={trpcClient}
      queryClient={queryClient}
    >
      {children}
    </TRPCProvider>
  );
}
