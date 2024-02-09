"use client";
import React from "react";
import Image from "next/image";
import SettingDropdown from "./SettingDropdown";
import MobileSideBar from "./MobileSideBar";
import AddPost from "../post/AddPost";
import { User } from "@supabase/supabase-js";
import { Plus } from "lucide-react";

export default function MobileAppNav({ user }: { user: User }) {
  return (
    <div className="md:hidden">
      <nav className="flex justify-between items-center p-2">
        <MobileSideBar />
        <Image
          src="/images/logo_512.png"
          width={40}
          height={40}
          alt="logo"
          priority={true}
        />
        <SettingDropdown />
      </nav>
      <AddPost
        user={user}
        children={
          <button className="absolute bottom-2 right-2 bg-primary h-14 w-14 rounded-full flex justify-center items-center text-white">
            <Plus />
          </button>
        }
      />
    </div>
  );
}
