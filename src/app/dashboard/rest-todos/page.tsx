export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";

import { NewTodo, TodosGrid } from "@/todos";
import { getUserSessionServer } from "@/auth";

import prisma from "@/lib/prisma";

export const metadata = {
  title: "Rest Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {

  const user = await getUserSessionServer();

  if (!user) redirect("/api/auth/signin");
  

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: "asc" },
  });

  return (
    <div className="p-2">
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
