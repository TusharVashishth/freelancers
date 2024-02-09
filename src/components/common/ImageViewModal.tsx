"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getS3Url } from "@/lib/helper";

export default function ImageViewModal({ image }: { image: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={getS3Url(image)}
          width={100}
          height={100}
          alt="image"
          className="w-full object-contain rounded-xl cursor-pointer"
          unoptimized
        />
      </DialogTrigger>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle>Image View</DialogTitle>
        </DialogHeader>
        <Image
          src={getS3Url(image)}
          width={100}
          height={100}
          alt="image"
          className="w-full h-full object-contain rounded-xl"
          unoptimized
        />
      </DialogContent>
    </Dialog>
  );
}
