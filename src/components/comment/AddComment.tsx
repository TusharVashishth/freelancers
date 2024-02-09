"use client";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle, Image } from "lucide-react";
import ImagePreview from "../common/ImagePreview";
import { Button } from "../ui/button";
import Loading from "@/app/(front)/loading";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/lib/supabase/supabaseClient";
import Env from "@/env";
import { toast } from "react-toastify";

export default function AddComment({
  post,
  userId,
}: {
  post: PostType;
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleIconClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  const removePriview = () => {
    setImage(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    setPreviewUrl(undefined);
  };

  const addComment = async () => {
    setLoading(true);
    const payload: CommentPayloadType = {
      content: content,
      user_id: userId,
      post_id: post.post_id,
    };

    if (image) {
      const path = `${userId}/${uuidv4()}`;
      const { data: imgData, error } = await supabase.storage
        .from(Env.S3_BUCKET)
        .upload(path, image);
      if (error) {
        toast.error("Something went wrong.please try again!", {
          theme: "colored",
        });
        setLoading(false);
        return;
      }
      payload.image = imgData.path;
    }

    // * Add Post here
    const { error: postErr } = await supabase.from("comments").insert(payload);
    if (postErr) {
      console.log("The comment error is", postErr);
      toast.error("Something went wrong.please try again!", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    // * Add Data in notification
    const { error: notiError } = await supabase.from("notifications").insert({
      user_id: userId,
      post_id: post.post_id,
      to_user_id: post.user_id,
      type: 2,
    });

    if (notiError) {
      console.log("The notification error ", notiError);
    }

    // * increase comment count
    await supabase.rpc("comment_increment", { row_id: post.post_id, count: 1 });

    resetState();
    setLoading(false);
    toast.success("Commented successfully!", { theme: "colored" });
    setOpen(false);
  };

  const resetState = () => {
    setContent("");
    removePriview();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MessageCircle />
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="border-none"
      >
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
        </DialogHeader>
        <div>
          <textarea
            className="bg-muted rounded-lg w-full outline-none border h-32 p-2"
            placeholder="Add your reply"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
          {previewUrl && (
            <ImagePreview image={previewUrl} callback={removePriview} />
          )}
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={handleImageChange}
            accept="image/png,image/jpg,image/jpeg,image/svg,image/gif"
          />
          <div className="flex justify-between items-center mt-2">
            <Image
              className="h-5 w-5 text-gray-500 mt-2 cursor-pointer"
              onClick={handleIconClick}
            />
            <Button
              size="sm"
              disabled={content.length <= 0}
              onClick={addComment}
            >
              {loading ? "Processing.." : "Comment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
