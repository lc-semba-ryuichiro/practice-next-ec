import { useCallback, useState } from "react";
import type React from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { useTRPC } from "@/integrations/trpc/react";

export const Route = createFileRoute("/demo/trpc-todo")({
  component: TRPCTodos,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(context.trpc.todos.list.queryOptions());
  },
});

/**
 * tRPC Todos component.
 * @returns The tRPC Todos JSX element.
 */
function TRPCTodos(): React.JSX.Element {
  const trpc = useTRPC();
  const { data, refetch } = useQuery(trpc.todos.list.queryOptions());

  const [todo, setTodo] = useState("");
  const { mutate: addTodo } = useMutation({
    ...trpc.todos.add.mutationOptions(),
    onSuccess: () => {
      void refetch();
      setTodo("");
    },
  });

  const submitTodo = useCallback((): void => {
    addTodo({ name: todo });
  }, [addTodo, todo]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-white"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 95% 5%, #4a90c2 0%, #317eb9 50%, #1e4d72 100%)",
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-4 text-2xl">tRPC Todos list</h1>
        <ul className="mb-4 space-y-2">
          {data?.map((t) => (
            <li
              key={t.id}
              className="rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm"
            >
              <span className="text-lg text-white">{t.name}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={todo}
            onChange={(event) => {
              setTodo(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submitTodo();
              }
            }}
            placeholder="Enter a new todo..."
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            disabled={todo.trim().length === 0}
            onClick={submitTodo}
            className="rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
          >
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
}
