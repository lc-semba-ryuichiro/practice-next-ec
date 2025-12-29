import type React from "react";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import type { TRPCRouter } from "@/integrations/trpc/router";

import { Header } from "../components/Header";
import { tanstackQueryDevtools } from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

interface MyRouterContext {
  queryClient: QueryClient;

  trpc: TRPCOptionsProxy<TRPCRouter>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

/**
 * Root document component.
 * @param root0 - The component props.
 * @param root0.children - The children to render.
 * @returns The root document element.
 */
function RootDocument({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            tanstackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
