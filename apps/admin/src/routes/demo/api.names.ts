import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/api/names")({
  server: {
    handlers: {
      GET: (): Response => Response.json(["Alice", "Bob", "Charlie"]),
    },
  },
});
