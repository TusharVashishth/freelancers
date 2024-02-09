"use client";
import { Bell, Bookmark, HomeIcon, Search, SunMoon, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const listCommonStyle = "flex space-x-4 mb-6";
  const pathname = usePathname();
  return (
    <div>
      <div className="flex justify-start mt-2">
        <Image src="/images/logo_512.png" width={60} height={60} alt="logo" />
      </div>

      <ul className="mt-6">
        <li className={`${listCommonStyle}`}>
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
        <li className={`${listCommonStyle}`}>
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
        <li className={`${listCommonStyle}`}>
          <Bell size={25} />
          <Link
            href="/notifications"
            className={`text-lg hover:font-bold ${
              pathname === "/search" ? "font-bold" : ""
            }`}
          >
            Notifications
          </Link>
        </li>
        <li className={`${listCommonStyle}`}>
          <Bookmark size={25} />
          <Link
            href="/bookmark"
            className={`text-lg hover:font-bold ${
              pathname === "/bookmark" ? "font-bold" : ""
            }`}
          >
            Bookmark
          </Link>
        </li>
        <li className={`${listCommonStyle}`}>
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
        <li className={`${listCommonStyle}`}>
          <SunMoon size={25} />
          <ThemeToggle />
        </li>
      </ul>

      <div className="absolute left-4 bottom-10">
        <div className=""></div>
        <p>Tushar</p>
      </div>
    </div>
  );
}
