import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";


const menuItems = [
  {
    title: "Dashboard",
    icon: <IoCalendarOutline />,
    path: "/dashboard",
  },
  {
    title: "Rest TODOS",
    icon: <IoCheckboxOutline />,
    path: "/dashboard/rest-todos",
  },
  {
    title: "Server Actions",
    icon: <IoListOutline />,
    path: "/dashboard/server-todos",
  },
  {
    title: "Cookies",
    icon: <IoCodeWorkingOutline />,
    path: "/dashboard/cookies",
  },
  {
    title: "Productos",
    icon: <IoBasketOutline />,
    path: "/dashboard/products",
  },
  {
    title: "Perfil",
    icon: <IoPersonOutline />,
    path: "/dashboard/profile",
  }
];

export const Sidebar = async() => {
  const session = await getServerSession(authOptions);
  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://tailusui.gallerycdn.vsassets.io/extensions/tailusui/tailus-snippets/0.8.0/1730439953863/Microsoft.VisualStudio.Services.Icons.Default";
  
  const userName = session?.user?.name ?? "No name";
  const userRoles = session?.user?.roles?.join(", ") ?? "No roles";
  
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://cdn.prod.website-files.com/66fa6069f207f846cdfe5119/674911bc4f9783d595a9497b_Horizontal%201.webp"
              className="w-32"
              alt="tailus logo"
              width={128}
              height={32}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            alt={userName}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={112}
            height={112}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">{userRoles}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center">
        <LogoutButton />
      </div>
    </aside>
  );
};
