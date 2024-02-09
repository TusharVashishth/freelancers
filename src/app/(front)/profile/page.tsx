import React from "react";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import UserAvatar from "@/components/common/UserAvatar";
import ProfileUpdate from "@/components/user/ProfileUpdate";
import { getS3Url } from "@/lib/helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/post/PostCard";
import CommentCard from "@/components/comment/CommentCard";

export default async function Profile() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  const { data: posts, error } = await supabase
    .rpc("get_posts_with_likes", {
      request_user_id: "aa6bfaf8-1ecf-48be-b049-09aed6bb9070",
    })
    .order("post_id", { ascending: false })
    .eq("user_id", user?.id);

  // * Fetch comments
  const { data: comments } = await supabase
    .from("comments")
    .select(
      "id ,image,content,created_at ,users(id,name,username,profile_image)"
    )
    .eq("user_id", user?.id);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">{user?.user_metadata?.["name"]}</p>
          <p className="font-bold">@{user?.user_metadata?.["username"]}</p>
        </div>
        <UserAvatar
          name={user?.user_metadata?.["name"]}
          image={
            user?.user_metadata?.["profile_image"] != null
              ? getS3Url(user?.user_metadata?.["profile_image"])
              : ""
          }
          width={5}
          height={5}
        />
      </div>

      <p className="mt-4">{user?.user_metadata?.["description"]}</p>

      <ProfileUpdate user={user!} />

      <Tabs defaultValue="posts" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts &&
            posts.length > 0 &&
            posts.map((item: PostType, index: number) => (
              <PostCard
                post={item as PostType}
                key={index}
                user={data.session?.user!}
              />
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
