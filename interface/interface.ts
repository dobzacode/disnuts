import { Comment, Post, User, Vote } from "@prisma/client";

export interface PostDetailProps
  extends Omit<Post, "community_id" | "post_id"> {
  votes: Vote[];
  comments: Comment[];

  author: { name: string; image: string | null };
  community: { name: string; community_id?: string };
  post_id: string;
}

export interface CommentDetail extends Comment {
  votes: Vote[];
  author: { name: string; image: string | null };
  child_comments: Comment[];
}
