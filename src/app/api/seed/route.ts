import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET(request: Request) { 
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra del poder', complete: false },
      { description: 'Piedra del tiempo', complete: false },
      { description: 'Piedra del espacio', complete: false },
      { description: 'Piedra de la realidad', complete: false },
    ],
  });

  return NextResponse.json({
    message: "Seed Executed",
  });
}