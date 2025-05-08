"use client";

import { useGetUserQuery } from "@/redux/Api/userApi";
import Footer from "@/shared/footer/Footer";
import HomeNavbar from "@/shared/navbar/HomeNavbar";
import Navbar from "@/shared/navbar/Navbar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const path = usePathname();
  const { data: verify }: { data?: any } = useGetUserQuery(undefined);
  const ispayment = verify?.data?.isPayment;

  return (
    <>
      {path === "/" || path === "/membership" ? <HomeNavbar /> : <Navbar />}

      <main style={{ minHeight: "calc(100vh - 360px)" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
