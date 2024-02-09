import React from "react";
import UserAvatar from "../common/UserAvatar";
import { formatDate, getS3Url } from "@/lib/helper";

export default function CommentCard({ comment }: { comment: CommentType }) {
  return (
    <div className="mb-4 bg-muted rounded-2xl p-2">
      {/* Header */}
      <div className="flex space-x-2">
        <UserAvatar
          name={comment?.users?.name}
          image={
            comment?.users?.profile_image
              ? getS3Url(comment?.users?.profile_image)
              : ""
          }
        />
        <div className="flex flex-col">
          <p className="font-bold">{comment?.users?.name}</p>
          <p>{formatDate(comment.created_at)}</p>
        </div>
      </div>

      <p className="p-2">{comment.content}</p>
    </div>
  );
}
