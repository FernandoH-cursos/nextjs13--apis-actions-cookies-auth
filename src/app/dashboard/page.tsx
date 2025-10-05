import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { WidgetItem } from "@/components";

import { authOptions } from "../api/auth/[...nextauth]/route";


/* 
* 'getServerSession' es una función que Next.js usa para obtener la sesión del usuario desde el servidor.
*/
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(session, null, 2));

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 grid-cols-1">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
        </div>
        
        <code>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </code>
      </WidgetItem>
    </div>
  );
}
