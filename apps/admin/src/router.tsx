import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";

import type { AnyRouter } from "@tanstack/react-router";

/**
 * Creates and configures the router instance with SSR query integration.
 * @returns The configured router instance
 */
export const getRouter = (): AnyRouter => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
    },

    defaultPreload: "intent",
  });

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient });

  return router;
};
