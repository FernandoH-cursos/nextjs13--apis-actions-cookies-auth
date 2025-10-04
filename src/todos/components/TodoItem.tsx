"use client";

import { startTransition, useOptimistic } from "react";

import { Todo } from "@prisma/client";

import { IoCheckboxOutline, IoStopOutline } from "react-icons/io5";


const styles = {
  todoDone:
    "line-through bg-blue-50 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0",
  todoPending:
    "bg-red-50 rounded-lg shadow-sm p-5 border-dashed border border-red-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0",
};

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

/* 
* 'useOptimistic' permite actualizar la UI de forma optimista, es decir, sin esperar a que la acción del servidor se complete
* Esto mejora la experiencia del usuario al hacer que la aplicación se sienta más rápida y responsiva
* En este caso, cuando el usuario hace clic para marcar un todo como completado o no, la UI se actualiza inmediatamente
* mostrando el cambio, mientras que la acción del servidor se ejecuta en segundo plano. 
* 
* 'startTransition' permite que las actualizaciones de estado que no son urgentes (como las actualizaciones optimistas)
* se realicen sin bloquear la interfaz de usuario, mejorando aún más la experiencia del usuario.
*/
export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      // Actualización optimista de la UI
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      // Llamada a la acción del servidor para actualizar el estado en la base de datos
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      console.log(error);
      // Si ocurre un error, revertimos la actualización optimista
      startTransition(() => toggleTodoOptimistic(todoOptimistic.complete));
    }
  };

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer bg-blue-100 hover:bg-opacity-60 ${
            todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {todoOptimistic.complete ? <IoCheckboxOutline size={30} />: <IoStopOutline size={30} />}
        </div>

        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
