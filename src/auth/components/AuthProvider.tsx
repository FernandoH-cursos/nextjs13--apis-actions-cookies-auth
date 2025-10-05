"use client";

import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: React.ReactNode;
}


/* 
* SessionProvider es un componente que nos sirve para proporcionar la sesión del usuario a todos los componentes de la aplicación.
*/
export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
