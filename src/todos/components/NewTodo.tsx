"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import * as todosApi from "@/todos/helpers/todos";
import { addTodo, deleteCompleted } from "../actions/todo-actions";

import { IoTrashOutline } from "react-icons/io5";

export const NewTodo = () => {
  const router = useRouter();

  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (description.length === 0) return;

    // Llamar a la función para crear un nuevo todo
    // await todosApi.createTodo(description);
    // Llama al server actions para crear un nuevo todo
    addTodo(description);

    // Refrescar la página para mostrar el nuevo todo
    router.refresh();
  };

  /* const deleteCompleted = async () => {
    await todosApi.deleteCompleted();

    router.refresh();
  }; */

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none bg-white focus:border-sky-500 transition-all"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Borrar completados
      </button>
    </form>
  );
};
