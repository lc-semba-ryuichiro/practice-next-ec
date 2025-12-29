import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { getContext } from "./integrations/tanstack-query/client";
import { routeTree } from "./routeTree.gen";

import type { AnyRouter } from "@tanstack/react-router";

/**
 * Creates and configures the router instance with SSR query integration.
 * @returns The configured router instance
 */
export const getRouter = (): AnyRouter => {
  const rqContext = getContext();

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
