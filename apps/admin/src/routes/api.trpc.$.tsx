import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { trpcRouter } from "@/integrations/trpc/router";

/**
 * Handler for tRPC requests.
 * @param root0 - The request object.
 * @param root0.request - The incoming request.
 * @returns The response from the tRPC handler.
 */
function handler({ request }: Readonly<{ request: Request }>): Promise<Response> {
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: "/api/trpc",
  });
}

export const Route = createFileRoute("/api/trpc/$")({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
    },
  },
});
