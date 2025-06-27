"use client";

import logo from "@/assets/expat-logo-transparent.png";
import Profile from "@/components/profile/Profile";
import { menuItems } from "@/constants/menuItems";
import Image from "next/image";
import Link from "next/link";
import { SideDrawer } from "../side-drawer/SideDrawer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode"; // Ensure proper import for jwtDecode
import Cookies from "js-cookie";
import { useGetAllConversationsQuery } from "@/redux/Api/messagesApi";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [messages, setMessages] = useState([]);
  // Get the user data from Redux store
  const user = useSelector((state: RootState) => state.Auth);
  const token = Cookies.get("token");
  const decodedToken: { isPayment: boolean } = token
    ? jwtDecode(token)
    : { isPayment: false };
  const isPayment = decodedToken.isPayment;

  const {
    data: conversations,
    isLoading,
    error,
  } = useGetAllConversationsQuery(undefined);

  useEffect(() => {
    if (!conversations?.data) return;

    const allMessages = conversations.data.flatMap(
      (conv: any) => conv.messages
    );
    setMessages(allMessages);
  }, [conversations]);

  return (
    <div className="fixed top-6 left-0 right-0 z-[9]">
      <div className="container">
        <div className="py-[14px] pr-[11px] pl-[11rem] bg-white rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="w-[220px] h-[50px] absolute -top-[52px] -left-[4px]">
              <Link href={isPayment ? "#" : "/"}>
                <Image
                  src={logo}
                  alt="Expat Group logo"
                  className="object-cover"
                />
              </Link>
            </div>
            <ul className="lg:flex  hidden items-center gap-[56px]">
              {isPayment &&
                menuItems.map((item) => (
                  <li key={item.label} className="relative">
                    <Link
                      href={item.href}
                      className="font-medium transition-colors duration-300 hover:text-primary text-[18px]"
                    >
                      {item.label}
                    </Link>
                    {/* {item.label == "My Profile" && messages?.length > 0 && (
                      <span className="absolute -top-2  -right-2 bg-red-500 text-white text-xs font-medium px-1 py-0 rounded-full">
                        {messages.length > 9 ? "9+" : messages.length}
                      </span>
                    )} */}
                  </li>
                ))}
            </ul>
            <div className="flex items-center gap-3">
              <SideDrawer className="lg:hidden" />
              {user?.token && isPayment ? (
                <Profile />
              ) : (
                <Link
                  href="/login"
                  className="bg-white py-[10px] lg:px-6 px-4 rounded-xl lg:font-semibold font-medium text-primary"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
