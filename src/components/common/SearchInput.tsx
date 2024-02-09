"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`/search?q=${search}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className="w-full rounded-xl h-12 p-2 pl-10 bg-muted outline-none border-1"
          placeholder="Type here...."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Search className="absolute left-2 top-3 text-gray-400 " />
      </div>
    </form>
  );
}
