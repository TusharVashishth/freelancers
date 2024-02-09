import React from "react";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import UserAvatar from "@/components/common/UserAvatar";
import { formatDate, getS3Url } from "@/lib/helper";
import Link from "next/link";

export default async function Notifications() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const { data: notifications, error } = await supabase
    .from("notifications")
    .select(
      "id ,post_id ,user_id ,type,created_at ,users(id ,name ,username ,profile_image)"
    )
    .eq("to_user_id", data.session?.user.id);

  return (
    <div className="">
      {notifications &&
        notifications.length > 0 &&
        notifications.map((item: NotificationType, index) => (
          <div className="flex space-x-3 mb-3 " key={index}>
            <UserAvatar
              name={item.users?.name}
              image={item.users?.image ? getS3Url(item.users?.image) : ""}
            />
            <div className="flex flex-col">
              <Link href={`/post/${item.post_id}`}>
                <strong>{item.users?.name}</strong>{" "}
                {item.type === 1 ? "liked your post" : "commented on your post"}
              </Link>
              <p>{formatDate(item.created_at)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
