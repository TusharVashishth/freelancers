"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import ImagePreview from "../common/ImagePreview";
import { createClient } from "@/lib/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Env from "@/env";

export default function ProfileUpdate({ user }: { user: User }) {
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState({
    name: user.user_metadata?.["name"],
    username: user.user_metadata?.["username"],
    description: user.user_metadata?.["description"],
    email: user.email,
  });

  const supabase = createClient();
  const router = useRouter();

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    let payload: ProfilePayloadType = {
      name: authState.name,
      description: authState.description,
    };
    if (image) {
      const path = `/${user.id}/profile.png`;
      const { data, error } = await supabase.storage
        .from(Env.S3_BUCKET)
        .upload(path, image, {
          upsert: true,
        });

      if (error) {
        setLoading(false);
        console.log("Image upload error is", error);
        toast.error("Something went wrong", { theme: "colored" });
        return;
      }

      payload.profile_image = data?.path;
    }

    const { error } = await supabase.auth.updateUser({
      data: payload,
    });

    if (error) {
      setLoading(false);
      toast.error("Something went wrong.please try again!");
      return;
    }
    setLoading(false);
    toast.success("Profile updated successfully!", { theme: "colored" });
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="overflow-y-scroll max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Enter your name"
              value={authState.name}
              onChange={(event) =>
                setAuthState({ ...authState, name: event.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter your name"
              value={authState.email}
              readOnly
              id="email"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              onChange={(event) =>
                setAuthState({ ...authState, description: event.target.value })
              }
              value={authState.description}
              placeholder="Type you bio"
              id="bio"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              type="file"
              id="profileImage"
              ref={imageRef}
              onChange={handleImageChange}
            />
            {previewUrl && (
              <div className="mt-2">
                <ImagePreview image={previewUrl} callback={removePriview} />
              </div>
            )}
          </div>
          <div className="mb-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Processing." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
