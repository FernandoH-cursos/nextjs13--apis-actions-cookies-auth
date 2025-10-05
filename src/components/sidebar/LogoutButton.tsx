"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { CiLogin, CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";

export const LogoutButton = () => {
  const { status } = useSession();
  // console.log(status);


  if (status === "loading") {
    return (
      <div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <button onClick={() => signIn()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer">
        <CiLogin />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    );
  }


  return (
    <button onClick={() => signOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer">
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
}
