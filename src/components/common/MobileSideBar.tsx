"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, HomeIcon, MenuIcon, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileSideBar() {
  const listCommonStyle = "flex space-x-4 mb-6";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="w-3/5">
        <div className="flex justify-center ">
          <Image
            src="/images/logo_512.png"
            width={50}
            height={50}
            alt="logo"
            priority={true}
          />
        </div>

        <ul className="mt-6">
          <li className={`${listCommonStyle}`} onClick={() => setOpen(false)}>
            <HomeIcon size={25} />
            <Link
              href="/"
              className={`text-lg hover:font-bold ${
                pathname === "/" ? "font-bold" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className={`${listCommonStyle}`} onClick={() => setOpen(false)}>
            <Search size={25} />
            <Link
              href="/search"
              className={`text-lg hover:font-bold ${
                pathname === "/search" ? "font-bold" : ""
              }`}
            >
              Search
            </Link>
          </li>
          <li className={`${listCommonStyle}`} onClick={() => setOpen(false)}>
            <Bell size={25} />
            <Link
              href="/notifications"
              className={`text-lg hover:font-bold ${
                pathname === "/notifications" ? "font-bold" : ""
              }`}
            >
              Notifications
            </Link>
          </li>
          <li className={`${listCommonStyle}`} onClick={() => setOpen(false)}>
            <User size={25} />
            <Link
              href="/profile"
              className={`text-lg hover:font-bold ${
                pathname === "/profile" ? "font-bold" : ""
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
