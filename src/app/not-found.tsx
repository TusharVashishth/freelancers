"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Image
        src="/images/404.svg"
        width={500}
        height={500}
        alt="404_img"
        className="w-"
      />
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
