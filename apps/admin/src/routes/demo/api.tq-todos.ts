import { createFileRoute } from "@tanstack/react-router";

interface Todo {
  id: number;
  name: string;
}

let mut_todos: Array<Todo> = [
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
        return Response.json(mut_todos);
      },
      POST: async ({ request }): Promise<Response> => {
        const name = (await request.json()) as string;
        const todo: Todo = {
          id: mut_todos.length + 1,
          name,
        };
        mut_todos = [...mut_todos, todo];
        return Response.json(todo);
      },
    },
  },
});
