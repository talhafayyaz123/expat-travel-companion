"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { adminSidebarRoutesType } from "@/types/sidebarItemsType";
import Image from "next/image";

interface props {
  routes: adminSidebarRoutesType;
  expand?: boolean;
  setExpand?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarRoutes = ({ routes, expand, setExpand }: props) => {
  const pathname = usePathname();

  // Check if this route or any of its subItems is active
  const isActive =
    pathname === routes.link ||
    routes.subItems?.some((subItem: any) => pathname.startsWith(subItem.link));

  return (
    <Link
      href={routes.link}
      className={`w-full hover:bg-[#fcfcfc] py-2 md:pl-6 pl-1 border-l-4 ${
        isActive
          ? "border-l-[#0076EF] bg-[linear-gradient(90deg,_rgba(0,_118,_239,_0.27)_0%,_rgba(0,_118,_239,_0.06)_100%)]"
          : ""
      }`}
      style={{}}
      key={routes.link}
    >
      <div className="flex max-md:text-xl  items-center gap-2 relative ">
        <Image
          src={routes.icon}
          height={24}
          width={24}
          alt=""
          className="md:size-6 size-3"
        />
        <p
          className={`md:text-[18px] text-sm ${
            expand ? "md:flex block" : "md:flex hidden"
          }`}
        >
          {routes.label}
        </p>
      </div>
    </Link>
  );
};

export default SidebarRoutes;
