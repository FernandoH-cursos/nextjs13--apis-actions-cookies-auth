import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import * as yup from "yup";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;  

  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    return NextResponse.json({ error: `Tarea con id '${id}' no existe` }, { status: 404 });
  }

  return NextResponse.json(todo);
}


const putSchema = yup.object({
  description: yup.string().trim().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const { description, complete } = await putSchema.validate(
      await request.json()
    );

    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return NextResponse.json(
        { error: `Tarea con id '${id}' no existe` },
        { status: 404 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        description: description ?? existingTodo.description,
        complete: complete ?? existingTodo.complete,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
   return NextResponse.json(
     { error: (error as Error).message },
      { status: 400 }
   );
  }
}
