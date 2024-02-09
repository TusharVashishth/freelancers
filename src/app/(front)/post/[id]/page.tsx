import React from "react";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from "@/components/post/PostCard";
import CommentCard from "@/components/comment/CommentCard";

export default async function Post({ params }: { params: { id: number } }) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const { data: post } = await supabase
    .rpc("get_posts_with_likes", { request_user_id: data.session?.user.id })
    .eq("post_id", params?.id)
    .single();

  // * Fetch comments
  const { data: comments } = await supabase
    .from("comments")
    .select(
      "id ,image,content,created_at ,users(id,name,username,profile_image)"
    )
    .eq("post_id", params.id);

  return (
    <div>
      <PostCard post={post as PostType} user={data.session?.user!} />

      {comments && comments.length > 0 && (
        <div className="mt-4">
          <h1 className="font-bold mb-4">Comments:-</h1>
          {comments.map((item, index) => (
            <CommentCard comment={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
