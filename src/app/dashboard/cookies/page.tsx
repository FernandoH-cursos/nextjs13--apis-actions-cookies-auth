import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies",
  description: "SEO Title",
};

/* 
* cookies() es una función que nos sirve para obtener las cookies del lado del servidor.
* Usando get() obtenemos el valor de la cookie.
*/ 
export default async function CookiesPage() {
  const cookieStore = await cookies();
  const cookieTab = Number(cookieStore.get("selectedTab")?.value ?? "1");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-2">
        <span className="text-3xl">Tabs</span>

        <TabBar currentTab={cookieTab}/>
      </div>
    </div>
  );
}