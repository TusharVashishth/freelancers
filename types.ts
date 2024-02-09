type ProfilePayloadType = {
  name: string;
  description?: string;
  profile_image?: string;
};

type PostPayloadType = {
  content: string;
  user_id: string;
  image?: string;
};

type CommentPayloadType = PostPayloadType & {
  post_id: number;
};

type PostType = {
  post_id: number;
  user_id: string;
  content: string;
  image?: string;
  name: string;
  username: string;
  email: string;
  profile_image?: string;
  likes_count: number;
  reply_count: number;
  created_at: string;
  liked: boolean;
};

type CommentType = {
  id: number;
  image?: string;
  content: string;
  created_at: string;
  users: any;
};

type NotificationType = {
  id: number;
  post_id: number;
  user_id: string;
  type: number;
  created_at: string;
  users: any;
};

type UserType = {
  id: string;
  name: string;
  username: string;
  profile_image?: string;
  email: string;
  metadata: any;
};
