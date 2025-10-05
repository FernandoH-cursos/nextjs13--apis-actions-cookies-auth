"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  title: string;
  icon?: React.ReactNode;
  path: string;
}

export const SidebarItem = ({ title, path, icon }: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 group rounded-xl hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${
          pathname === path
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        }`}
      >
        {icon}
        <span className="group-hover:text-white">{title}</span>
      </Link>
    </li>
  );
};
