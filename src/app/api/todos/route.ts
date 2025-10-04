import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

import * as yup from 'yup';

export async function GET(request: Request) { 
  const { searchParams } = new URL(request.url);
  
  const limit = Number(searchParams.get('limit')) || 10;
  const page = Number(searchParams.get('page')) || 1;

  if(isNaN(page)) return NextResponse.json({ error: '"page" debe ser un número' }, { status: 400 });
  if(isNaN(limit)) return NextResponse.json({ error: '"limit" debe ser un número' }, { status: 400 });

  const todos = await prisma.todo.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json(todos)
}

const postSchema = yup.object({
  description: yup.string().trim().required(),
});

export async function POST(request: Request) {
  try {
    const {description} = await postSchema.validate(await request.json());

    const newTodo = await prisma.todo.create({
      data: {
        description,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE() {
  const deletedTodos = await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });

  return NextResponse.json(deletedTodos);
}