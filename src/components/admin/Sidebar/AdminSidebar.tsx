"use client";

import { adminSidebarRoutes } from "@/constants/adminSidebarItems";
import Image from "next/image";
import SidebarRoutes from "./SidebarRoutes";
import logo from "@/assets/expat-logo-transparent.png";
import { CiMenuFries } from "react-icons/ci";
import logoutSvg from "@/assets/dashboard/logout.svg";
import Link from "next/link";
import { logOut } from "@/redux/ReduxFunction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearFormData } from "@/redux/allSlice/formslice";
import Cookies from "js-cookie";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Props {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ expand, setExpand }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logOut());
    dispatch(clearFormData());
    router.push("/adminLogin");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 transition h-[calc(100vh-20px)] md:w-[300px] md:block hidden`}
        id="adminSidebar"
      >
        <div className="relative md:pt-0 pt-20"></div>

        <div className="logo py-5 md:flex justify-center hidden">
          <Link href={"/dashboard/admin"}>
            <Image
              className="object-cover w-[150px] h-[70px]"
              // className="h-[68px] w-[92px] mx-auto object-fill"
              src={logo}
              alt="Image Description"
              width={150}
              height={150}
              unoptimized
            />
          </Link>
        </div>

        <div className="items flex flex-col gap-2 pt-5">
          {adminSidebarRoutes.map((item) => (
            <SidebarRoutes
              expand={expand}
              setExpand={setExpand}
              routes={item}
              key={item.link}
            />
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full">
          <div className="flex items-center justify-center md:gap-2 gap-1">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center md:gap-2 gap-1">
                  <Image
                    src={logoutSvg}
                    height={24}
                    width={24}
                    alt=""
                    className={`size-6 ${expand ? "flex" : "flex"}`}
                    unoptimized
                  />
                  <p
                    className={`${
                      expand
                        ? "md:flex block md:text-[16px] text-sm"
                        : "md:flex hidden"
                    } text-[#0F0F0F]`}
                  >
                    Logout
                  </p>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to log out?
                </DialogDescription>
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 border border-gray-300 rounded px-4 py-2"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white rounded px-4 py-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar using ShadCN UI Sheet */}
      <Sheet open={show} onOpenChange={setShow}>
        <DialogContent />
        <DialogTitle />
        <SheetTrigger asChild>
          <button className="md:hidden fixed top-8 left-5 z-50 w-max">
            <CiMenuFries className="text-xl w-max" />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <div
            className="flex flex-col gap-2 pt-5"
            onClick={() => setShow(false)}
          >
            <Link href={"/dashboard/admin"}>
              <Image
                className="h-[68px] w-[92px] mx-auto object-fill"
                src={logo}
                alt="Image Description"
                width={150}
                height={150}
                unoptimized
              />
            </Link>
            {adminSidebarRoutes.map((item) => (
              <SidebarRoutes
                expand={true}
                setExpand={setExpand}
                routes={item}
                key={item.link}
              />
            ))}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full">
              <div className="flex items-center justify-center md:gap-2 gap-1">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="flex items-center md:gap-2 gap-1">
                      <Image
                        src={logoutSvg}
                        height={24}
                        width={24}
                        alt=""
                        className={`size-6 ${expand ? "flex" : "flex"}`}
                        unoptimized
                      />
                      <p
                        className={`${
                          expand ? "md:text-[16px] text-sm" : ""
                        } text-[#0F0F0F]`}
                      >
                        Logout
                      </p>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to log out?
                    </DialogDescription>
                    <div className="flex justify-end mt-4">
                      <button
                        className="mr-2 border border-gray-300 rounded px-4 py-2"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-600 text-white rounded px-4 py-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
