"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profileMenuItems } from "@/constants/profileMenuItems";
import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/ReduxFunction"; // Import logOut action
import Cookies from "js-cookie"; // To remove the cookie
import { clearFormData } from "@/redux/allSlice/formslice";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/redux/Api/userApi";
import { useEffect, useState } from "react";
import avatar from "@/assets/avatar.jpg";
import { useGetAllConversationsQuery } from "@/redux/Api/messagesApi";

export default function Profile() {
  const [messages, setMessages] = useState([]);
  // Access the token or login status from the Redux store
  const token = Cookies.get("token"); // Assumes token is stored in cookies
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data?.data,
      isLoading,
      isError,
    }),
  });

  const {
    data: conversations,
    error,
    isLoading: isConversationsLoading,
  } = useGetAllConversationsQuery(undefined);

  const { refetch } = useGetUserQuery(undefined);

  // Refetch user data when token changes (login/logout)
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const dispatch = useDispatch();
  const router = useRouter();

  // Logout handler
  const handleLogout = () => {
    // Remove token from cookies
    Cookies.remove("token");

    // Dispatch the logOut action to update the Redux store
    dispatch(logOut());

    dispatch(clearFormData());
    router.push("/");
  };

  if (isError) {
    return <div>Error loading user profile</div>;
  }

  useEffect(() => {
    // console.log('user ', user);
    // const userConversations = conversations?.data?.filter(
    //   (conv: any) => conv.participants === user.id
    // );
    // console.log("Profile:userConversations", conversations);
  }, [conversations]);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <div className="flex items-center relative lg:gap-3 gap-1 rounded-lg border lg:p-3 px-2 py-1 hover:bg-accent">
            <Avatar className="lg:h-10 h-8 w-8 lg:w-10">
              {/* Dynamically load the profile image if available */}
              <AvatarImage
                src={user?.profileImage || avatar}
                alt="Profile picture"
              />
              <AvatarFallback className="lg:text-inherit text-sm">
                {user?.firstName?.charAt(0)}{" "}
                {/* Use initials if no profile image */}
              </AvatarFallback>
            </Avatar>
            <div className="lg:flex flex-col items-start hidden">
              <div className="text-sm font-medium">{`Hey ${user?.firstName} ${user?.lastName}`}</div>
              <div className="text-xs text-red-500">
                {user?.email ? `${user?.email}` : "Email not provided"}
              </div>
            </div>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[280px]" align="end">
          {profileMenuItems.map((item) => (
            <DropdownMenuItem key={item.label} className="py-3">
              <Link
                href={item.href}
                className="flex items-center justify-between w-full"
              >
                {item.label}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>
            <button
              className="flex items-center justify-between py-1 text-red-500 w-full"
              onClick={handleLogout} // Call logout on button click
            >
              <span>Logout</span>
              <LogOut className="h-4 w-4" />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
