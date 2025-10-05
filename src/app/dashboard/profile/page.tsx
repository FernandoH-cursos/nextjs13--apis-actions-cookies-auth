"use client";

import { useSession } from "next-auth/react";

/* 
* useSession() es una hook que nos sirve para obtener la sesión del usuario desde el cliente.
*/
export default function ProfilePage() {

  const { data: session } = useSession();
  // console.log(session); 

  return (
    <div>
      <h1>Page Profile</h1>

      <hr className="my-2"/>

      <div className="flex flex-col gap-3 my-6">
        <span>{ session?.user?.name ?? "No name"}</span>
        <span>{ session?.user?.email ?? "No email"}</span>
        <span>{ session?.user?.image ?? "No image"}</span>
        <span>{ session?.user?.roles?.join(", ") ?? "No roles"}</span>
      </div>
    </div>
  )
}
