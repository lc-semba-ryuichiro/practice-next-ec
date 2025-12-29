import { createFileRoute } from "@tanstack/react-router";

interface Todo {
  id: number;
  name: string;
}

const todos: Array<Todo> = [
  {
    id: 1,
    name: "Buy groceries",
  },
  {
    id: 2,
    name: "Buy mobile phone",
  },
  {
    id: 3,
    name: "Buy laptop",
  },
];

export const Route = createFileRoute("/demo/api/tq-todos")({
  server: {
    handlers: {
      GET: () => {
        return Response.json(todos);
      },
      POST: async ({ request }): Promise<Response> => {
        const name = (await request.json()) as string;
        const todo: Todo = {
          id: todos.length + 1,
          name,
        };
        todos.push(todo);
        return Response.json(todo);
      },
    },
  },
});
