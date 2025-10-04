"use client";
import { useRouter } from "next/navigation";

import { TodoItem } from "./TodoItem";

// import * as todosApi from "@/todos/helpers/todos";

import { Todo } from "@prisma/client";
import { toggleTodo } from "../actions/todo-actions";

interface TodosGridProps {
  todos: Todo[];
}

export const TodosGrid = ({ todos }: TodosGridProps) => {
  const router = useRouter();

  /* const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodo(id, complete);
    console.log({updatedTodo});

    router.refresh();
  }; */


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
