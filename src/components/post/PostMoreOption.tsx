"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { createClient } from "@/lib/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function PostMoreOption({
  userId,
  post,
}: {
  userId: string;
  post: PostType;
}) {
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const deletePost = async () => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.post_id);
    if (error) {
      toast.error("Something went wrong.while deleting the post!", {
        theme: "colored",
      });
      return;
    }
    toast.success("Post Deleted successfully!!", { theme: "colored" });
    router.refresh();
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-none">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove it's data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={deletePost}>
              Yes Delete it!
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Info</DropdownMenuItem>
          {userId === post.user_id && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
