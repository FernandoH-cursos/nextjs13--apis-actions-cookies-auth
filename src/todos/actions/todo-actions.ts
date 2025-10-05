"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getUserSessionServer } from "@/auth";

export const sleep = async (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

//* Server action para actualizar el estado de un todo
export const toggleTodo = async (id: string, complete: boolean) => {
  await sleep(3);

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    throw new Error(`Todo con id ${id} no encontrado`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });
  // console.log({ updatedTodo });

  //* 'revalidatePath' permite refrescar la página indicada para que se vean los cambios realizados en el servidor
  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

//* Server action para crear un nuevo todo
export const addTodo = async (description: string) => {
  const user = await getUserSessionServer();
  try {
    const newTodo = await prisma.todo.create({
      data: { description, userId: user!.id },
    });
    // console.log({ newTodo });

    revalidatePath("/dashboard/server-todos");

    return newTodo;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Error al crear el todo",
    };
  }
};

//* Server action para eliminar todos los todos completados
export const deleteCompleted = async () => {
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: { complete: true },
    });
    // console.log({ deletedTodos });
    revalidatePath("/dashboard/server-todos");

    return deletedTodos;
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Error al eliminar los todos completados",
    };
  }
};
