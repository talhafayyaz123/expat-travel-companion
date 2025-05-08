"use client";

import Sidebar from "@/components/admin/Sidebar/AdminSidebar";
import AdminNavbar from "@/shared/navbar/AdminNavbar";
import React, { ReactNode, useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="flex !font-inter md:flex-row flex-col">
      {/* Sidebar */}
      <Sidebar expand={expand} setExpand={setExpand} />

      <div className="w-full ">
        {/* Header */}
        <AdminNavbar expand={expand} />

        {/* Main Content Area */}
        <main
          className={`bg-[#efefef] xl:px-10 md:px-5  px-1  py-5 min-h-screen md:ml-[300px]`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
