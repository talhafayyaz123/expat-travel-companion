"use client";
import logo from "@/assets/expat-logo-transparent.png";
import { menuItems } from "@/constants/menuItems";
import Image from "next/image";
import Link from "next/link";
import { SideDrawer } from "../side-drawer/SideDrawer";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Assuming this is the path to your store
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const HomeNavbar = () => {
  const path = usePathname();
  const isBlack = path.startsWith("/basic");
  const [isScrolled, setIsScrolled] = useState(false);

  // Get the user data from Redux store
  const user = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the banner (100vh)
      if (window.scrollY >= 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const token = Cookies.get("token");

  return (
    <div className="fixed top-6 left-0 right-0 z-[999]">
      <div className="container">
        <div className="pt-[26px] pb-[26px] pr-5 bg-[rgba(244,244,244,0.20)] backdrop-blur-[12px] rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="w-[220px] h-[50px] absolute -top-[48px] -left-[15px]">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Expat Group logo"
                  className="object-cover"
                  style={{ marginLeft: "-1rem" }}
                />
              </Link>
            </div>
            <div>
              <div className="lg:flex hidden items-center gap-[56px]">
                {/* {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors duration-300 ${isBlack ? "text-gray-700" : "text-white"}  hover:text-primary`}
                  >
                    <span className={`${isScrolled ? "text-black" : "text-white" }`}> 

                    {item.label}
                    </span>
                  </Link>
                </li>
              ))} */}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SideDrawer className="lg:hidden" />

              {!token && path !== "/membership" ? (
                <Link
                  href="/login"
                  className="bg-white py-[13px] lg:px-6 md:px-4 px-2 rounded-xl lg:font-semibold font-medium text-primary max-md:text-sm"
                >
                  Login
                </Link>
              ) : (
                <Link
                  href="/travel"
                  className="bg-white py-[13px] lg:px-6 md:px-4 px-2 rounded-xl lg:font-semibold font-medium text-primary max-md:text-sm"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
