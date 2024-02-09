import { Heart } from "lucide-react";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";
export default function PostLike({
  post,
  userId,
}: {
  post: PostType;
  userId: string;
}) {
  const supabase = createClient();
  const [isLiked, setLiked] = useState(post.liked);

  const toggleLike = async (type: number) => {
    if (type === 1) {
      setLiked(true);
      await supabase.rpc("like_increment", { row_id: post.post_id, count: 1 });
      await supabase
        .from("likes")
        .insert({ user_id: userId, post_id: post.post_id });

      await supabase.from("notifications").insert({
        post_id: post.post_id,
        user_id: userId,
        to_user_id: post.user_id,
        type: 1,
      });
    } else {
      setLiked(false);
      await supabase.rpc("like_decrement", { row_id: post.post_id, count: 1 });
      await supabase
        .from("likes")
        .delete()
        .match({ user_id: userId, post_id: post.post_id });

      await supabase
        .from("notifications")
        .delete()
        .match({ user_id: userId, post_id: post.post_id, type: 1 });
    }
  };

  return (
    <>
      {isLiked ? (
        <svg
          width="26"
          height="26"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-500 cursor-pointer"
          onClick={() => toggleLike(0)}
        >
          <path
            d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <Heart onClick={() => toggleLike(1)} />
      )}
    </>
  );
}
