import NextAuth, { NextAuthOptions } from "next-auth";

import { signInEmailPassword } from "@/auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

/*
 * Este archivo es necesario para que Next.js pueda manejar la autenticación de forma correcta.
 * Este archivo sirve para configurar los proveedores de autenticación de Auth.js.
 * Se pueden configurar múltiples proveedores de autenticación.
 */

/* 
? 'authOptions' es un objeto que contiene las opciones de autenticación de Auth.js.
* 'providers' es un array de proveedores de autenticación. Nos sirven para configurar los proveedores de autenticación de Auth.js.
* En este caso, solo configuramos un proveedor de autenticación, que es Github. Se le pasan las credenciales de Github para que Auth.js pueda usarlas.
* 'clientId' es la ID del cliente de Github.
* 'clientSecret' es el secreto del cliente de Github.
* 
* Tambien usamos GoogleProvider para configurar el proveedor de autenticación de Google.
* 'clientId' es la ID del cliente de Google.
* 'clientSecret' es el secreto del cliente de Google.
* 
* Tambien usamos CredentialsProvider para configurar el proveedor de autenticación de Credentials.
* El proveedor de autenticación de Credentials es un proveedor de autenticación que se usa para autenticar a un usuario con sus credenciales
* como email y contraseña.
* 'name' es el nombre del proveedor de autenticación.
* 'credentials' es un objeto que contiene las credenciales del proveedor de autenticación. 
*   - 'email' es el campo de email del proveedor de autenticación.
*   - 'password' es el campo de contraseña del proveedor de autenticación.
*   - 'placeholder' es el placeholder del campo de email y contraseña del proveedor de autenticación.
* 'authorize' es una función que se ejecuta cuando el usuario intenta iniciar sesión con las credenciales del proveedor de autenticación.
* 
* 'adapter' nos sirve para añadir un adaptador a Auth.js para que se pueda guardar información en la base de datos.
* En este caso, usamos PrismaAdapter para que se pueda guardar información en la base de datos usando Prisma ORM.
* 
* 'session' nos sirve para configurar la sesión de Auth.js.
* 'strategy' es el tipo de estrategia que usaremos para la sesión.
* En este caso, usamos 'jwt' para que se pueda usar el token de autenticación en el lado del cliente.
* 
* 'callbacks' nos sirve para configurar los callbacks de Auth.js. Que son funciones que se ejecutan en diferentes momentos de la autenticación.
* 
* 'signIn' es un callback que se ejecuta cuando el usuario intenta iniciar sesión.
* 'jwt' es un callback que se ejecuta cuando se crea un token de autenticación.
* 'session' es un callback que se ejecuta cuando se crea una sesión de autenticación.
* 
* 
* Esta configuracion crea una REST  API de autenticación para que Next.js pueda manejar la autenticación de forma correcta. Como lo son:
* - Login - /api/auth/signin
* - Logout - /api/auth/signout
* - Doc: https://next-auth.js.org/getting-started/rest-api
*/
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "usuario@gmail.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials, req) => {
        //* Usamos la función signInEmailPassword para autenticar al usuario con sus credenciales.
        const user = await signInEmailPassword(credentials!.email, credentials!.password);

        if (!user)  return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Callback que se ejecuta cuando el usuario intenta iniciar sesión.
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(JSON.stringify(user, null, 2));
      return true;
    },

    // Callback que se ejecuta cuando se crea un token de autenticación.
    async jwt({ token }) {
      // console.log("token jwt", JSON.stringify({ token }, null, 2));
      // Buscamos el usuario en la base de datos por el email del token.
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? "no-email",
        },
      });

      // Si el usuario no está activo, no se crea el token.
      if (!dbUser?.isActive) {
        throw new Error("User is not active");
      }

      // Si el usuario existe, añadimos los roles y el id al token.
      if (dbUser) {
        token.roles = dbUser.roles;
        token.id = dbUser.id;
      }

      return token;
    },

    // Callback que se ejecuta cuando se crea una sesión de autenticación.
    async session({ session, token }) {
      // console.log("token session", JSON.stringify({ token }, null, 2));

      // Si la sesión y el usuario existen, añadimos los roles y el id al usuario.
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    },
  },
};

/*
 * 'handler' es una función que Next.js usa para manejar la autenticación de forma correcta.
 * Se le pasa el objeto 'authOptions' para que Auth.js pueda usar las opciones de autenticación.
 */
const handler = NextAuth(authOptions);

/*
 * Se exportan las funciones GET y POST para que Next.js pueda manejar la autenticación de forma correcta.
 */
export { handler as GET, handler as POST };
