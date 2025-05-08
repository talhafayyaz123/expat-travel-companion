"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { menuItems } from "@/constants/menuItems";
import { cn } from "@/lib/utils";
import { SideDrawerProps } from "@/types/SideDrawer";
import { useGetUserQuery } from "@/redux/Api/userApi";

export function SideDrawer({ className }: SideDrawerProps) {
  const { user } = useGetUserQuery({}, {
    selectFromResult: ({ data }) => ({
      user: data?.data, // Correctly return the `user` object
    }),
  });

  // Define the default "Home" menu item
  const defaultHomeItem = {
    label: "Home",
    href: "/",
  };

  // Determine which menu items to display
  const filteredMenuItems = user?.isPayment
    ? menuItems // Show all menu items
    : [defaultHomeItem]; // Show only the default "Home" item

  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <nav className="mt-4">
              <ul className="space-y-2">
                {filteredMenuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block py-1 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
