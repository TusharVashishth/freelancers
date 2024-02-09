import React from "react";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import UserAvatar from "@/components/common/UserAvatar";

import { getS3Url } from "@/lib/helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/post/PostCard";
import CommentCard from "@/components/comment/CommentCard";

export default async function User({ params }: { params: { id: string } }) {
  const supabase = createClient(cookies());
  const { data: user } = await supabase
    .from("users")
    .select("id,name,username,email,profile_image,metadata")
    .eq("id", params?.id)
    .single();
  const { data: posts, error } = await supabase
    .rpc("get_posts_with_likes", {
      request_user_id: "aa6bfaf8-1ecf-48be-b049-09aed6bb9070",
    })
    .order("post_id", { ascending: false })
    .eq("user_id", params?.id);

  // * Fetch comments
  const { data: comments } = await supabase
    .from("comments")
    .select(
      "id ,image,content,created_at ,users(id,name,username,profile_image)"
    )
    .eq("user_id", params?.id);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="font-bold">@{user?.metadata?.["username"]}</p>
        </div>
        <UserAvatar
          name={user?.name}
          image={
            user?.profile_image != null ? getS3Url(user?.profile_image) : ""
          }
          height={5}
          width={5}
        />
      </div>

      <p className="mt-4">{user?.metadata?.["description"]}</p>

      <Tabs defaultValue="posts" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts &&
            posts.length > 0 &&
            posts.map((item: PostType, index: number) => (
              <PostCard post={item as PostType} key={index} user={user!} />
            ))}
        </TabsContent>
        <TabsContent value="comments">
          {comments &&
            comments.length > 0 &&
            comments.map((item, index) => (
              <CommentCard comment={item} key={index} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
