"use client";
import { adminSidebarRoutes } from "@/constants/adminSidebarItems";
import Image from "next/image";
import React, { useState } from "react";
import SidebarRoutes from "../Sidebar/SidebarRoutes";
import { Button } from "@/components/ui/button";
import logo from "@/assets/expat-logo-pro.png";
import { LogOut } from "lucide-react";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* <CiMenuFries className="md:hidden" onClick={()=>setOpen(true)}/> */}

      {open && (
        <div className=" w-[300px] md:block hidden  fixed top-0 left-0 h-[calc(100vh-20px)] overflow-hidden shrink-0 z-30">
          <div className="logo py-5">
            <Image
              className="h-[68px] w-[92px] mx-auto object-fill "
              src={logo}
              alt="Image Description"
              width={150}
              height={150}
              unoptimized
            />
          </div>

          {/* border */}
          <div className="border-b border"></div>

          {/* sidebar routes */}
          <div className="items flex flex-col gap-2 pt-5">
            {adminSidebarRoutes.map((item) => (
              <SidebarRoutes routes={item} key={item.link} />
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <Button className="flex items-center gap-2" variant={"link"}>
              <LogOut /> 
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
