import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superjson from "superjson";

import { TRPCProvider } from "@/integrations/trpc/react";
import type { TRPCRouter } from "@/integrations/trpc/router";

import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

/**
 * Constructs the tRPC API URL based on the environment.
 * @returns The tRPC API endpoint URL
 */
function getUrl(): string {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    const port = String(process.env["PORT"] ?? 3000);
    return `http://localhost:${port}`;
  })();
  return `${base}/api/trpc`;
}

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: getUrl(),
    }),
  ],
});

/** Context returned by getContext function. */
interface TanstackQueryContext {
  readonly queryClient: QueryClient;
  readonly trpc: TRPCOptionsProxy<TRPCRouter>;
}

/**
 * Creates the TanStack Query and tRPC context for the application.
 * @returns The context object containing queryClient and tRPC helpers
 */
export function getContext(): TanstackQueryContext {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  });

  const serverHelpers = createTRPCOptionsProxy({
    client: trpcClient,
    queryClient: queryClient,
  });
  return {
    queryClient,
    trpc: serverHelpers,
  };
}

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
