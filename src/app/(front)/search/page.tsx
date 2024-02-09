import SearchInput from "@/components/common/SearchInput";
import React from "react";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import UserAvatar from "@/components/common/UserAvatar";
import { getS3Url } from "@/lib/helper";
import Link from "next/link";

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const supabase = createClient(cookies());
  const { data: user } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("users")
    .select("id ,username,name,profile_image")
    .ilike("username", `%${searchParams?.q}%`)
    .neq("id", user.session?.user.id);
  return (
    <div>
      <SearchInput />

      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <Link
            className="flex  space-x-4 mt-4  p-2"
            key={index}
            href={`/user/${item.id}`}
          >
            <UserAvatar
              name={item.name}
              image={item.profile_image ? getS3Url(item.profile_image) : ""}
            />
            <div className="flex flex-col">
              <p className="font-bold">{item.name}</p>
              <p>{item.username}</p>
            </div>
          </Link>
        ))}

      {data && data.length < 0 && (
        <p className="text-center text-2xl mt-4">No record found!</p>
      )}
    </div>
  );
}
