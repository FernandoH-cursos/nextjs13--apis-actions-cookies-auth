import { Todo } from "@prisma/client";

type DeleteResponse = { count: number };

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };

  const todo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  // console.log(todo);

  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const todo = await fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  console.log(todo);

  return todo;
};

export const deleteCompleted = async (): Promise<DeleteResponse> => {
  const result = await fetch(`/api/todos`, {
    method: "DELETE",
  }).then((res) => res.json());

  console.log(result);

  return result;
};
