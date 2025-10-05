import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();


  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456", 10),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Piedra del alma", complete: true },
          { description: "Piedra del poder", complete: false },
          { description: "Piedra del tiempo", complete: false },
          { description: "Piedra del espacio", complete: false },
          { description: "Piedra de la realidad", complete: false },
        ],
      },
    },
  });

  return NextResponse.json({
    message: "Seed Executed",
  });
}