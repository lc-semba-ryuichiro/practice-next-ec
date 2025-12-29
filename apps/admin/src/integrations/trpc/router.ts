import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "./init";

import type { TRPCRouterRecord } from "@trpc/server";

let mut_todos = [
  { id: 1, name: "Get groceries" },
  { id: 2, name: "Buy a new phone" },
  { id: 3, name: "Finish the project" },
];

const todosRouter = {
  list: publicProcedure.query(() => mut_todos),
  add: publicProcedure.input(z.object({ name: z.string() })).mutation(({ input }) => {
    const newTodo = { id: mut_todos.length + 1, name: input.name };
    mut_todos = [...mut_todos, newTodo];
    return newTodo;
  }),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
});
export type TRPCRouter = typeof trpcRouter;
