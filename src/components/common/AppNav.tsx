"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  HomeIcon,
  Search,
  StickyNote,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SettingDropdown from "./SettingDropdown";
import AddPost from "../post/AddPost";
import { User as SupabaseUser } from "@supabase/supabase-js";

export default function AppNav({ user }: { user: SupabaseUser }) {
  const pathName = usePathname();
  const router = useRouter();
  const staticRoutes = ["/", "/search", "/profile", "/notifications"];

  return (
    <>
      <nav className="hidden md:flex justify-between items-center p-2">
        <Image
          src="/images/logo_512.png"
          width={60}
          height={60}
          alt="logo"
          priority={true}
        />

        <div className="flex space-x-12 items-center transition-all ease-in">
          {!staticRoutes.includes(pathName) && (
            <ArrowLeft
              className="cursor-pointer"
              size={30}
              onClick={() => router.back()}
            />
          )}

          <Link
            href="/"
            className={`hover:text-foreground ${
              pathName === "/" ? "text-foreground" : "text-gray-500"
            }`}
          >
            <HomeIcon size={30} />
          </Link>
          <Link
            href="/search"
            className={`hover:text-foreground ${
              pathName === "/search" ? "text-foreground" : "text-gray-500"
            }`}
          >
            <Search size={30} />
          </Link>

          <AddPost
            user={user}
            children={
              <StickyNote
                size={30}
                className="text-gray-500 cursor-pointer hover:text-foreground"
              />
            }
          />

          <Link
            href="/notifications"
            className={`hover:text-foreground ${
              pathName === "/notifications"
                ? "text-foreground"
                : "text-gray-500"
            }`}
          >
            <Bell size={30} />
          </Link>
          <Link
            href="/profile"
            className={`hover:text-foreground ${
              pathName === "/profile" ? "text-foreground" : "text-gray-500"
            }`}
          >
            <User size={30} />
          </Link>
        </div>

        <SettingDropdown />
      </nav>
    </>
  );
}
