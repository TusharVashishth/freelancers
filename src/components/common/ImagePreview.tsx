"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImagePreview({
  image,
  callback,
}: {
  image: string;
  callback: () => void;
}) {
  return (
    <div className="relative border-2 rounded-xl  ">
      <Image
        src={image}
        width={10}
        height={10}
        alt="image_preview"
        className="w-full object-contain"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-2 right-2"
        onClick={callback}
      >
        <X />
      </Button>
    </div>
  );
}
