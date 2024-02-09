"use client";
import React from "react";
import UserAvatar from "../common/UserAvatar";
import { Bookmark, MoreVertical, Send } from "lucide-react";
import { formatDate, getS3Url } from "@/lib/helper";
import AddComment from "../comment/AddComment";
import { User } from "@supabase/supabase-js";
import PostLike from "./PostLike";
import ImageViewModal from "../common/ImageViewModal";
import Link from "next/link";
import PostMoreOption from "./PostMoreOption";

export default function PostCard({
  post,
  user,
}: {
  post: PostType;
  user: User | UserType;
}) {
  return (
    <div className="w-full bg-muted rounded-2xl mb-4">
      {/* Card Top Bar */}
      <div className="flex p-2 justify-between items-center">
        <div className="flex space-x-2">
          <UserAvatar
            name={post.name}
            image={post.profile_image ? getS3Url(post.profile_image) : ""}
          />
          <div className="flex flex-col">
            <p className="font-bold">{post.name}</p>
            <p className="text-sm">{formatDate(post.created_at)}</p>
          </div>
        </div>
        <PostMoreOption userId={user.id} post={post} />
      </div>
      {post.image && <ImageViewModal image={post.image} />}

      <Link href={`/post/${post.post_id}`} className="p-2">
        {post.content}
      </Link>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center  mt-4 p-2 cursor-pointer">
        <div className="flex space-x-4">
          <PostLike userId={user.id} post={post} />
          <AddComment post={post} userId={user.id} />
          <Send />
        </div>
        <Bookmark />
      </div>

      {/* show like and reply count */}
      <div className="flex space-x-4 p-2">
        <p>Replies {post.reply_count}</p>
        <p>likes {post.likes_count ?? 0}</p>
      </div>
    </div>
  );
}
