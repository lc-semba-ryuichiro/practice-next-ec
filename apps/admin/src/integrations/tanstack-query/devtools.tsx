import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

import type { TanStackDevtoolsReactPlugin } from "@tanstack/react-devtools";

/**
 * Tanstack Query devtools configuration object.
 */
export const tanstackQueryDevtools: TanStackDevtoolsReactPlugin = {
  name: "Tanstack Query",
  render: <ReactQueryDevtoolsPanel />,
};
