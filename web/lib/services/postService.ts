import { postsApi } from "@/lib/api/posts";
import type { Post } from "@/types";

export const postService = {
  getFeed: async (cursor: number | null = null) => {
    const data = await postsApi.getFeed(cursor);
    return data;
  },

  getPost: async (postId: number) => {
    const post = await postsApi.getById(postId);
    return post;
  },

  getPostsByUser: async (userId: number, cursor: number | null = null) => {
    const data = await postsApi.getPostsByUser(userId, cursor);
    return data;
  },

  createPost: async (payload: FormData) => {
    return postsApi.create(payload);
  },

  deletePost: async (postId: number) => {
    return postsApi.delete(postId);
  },

  toggleLike: async (postId: number, isLiked: boolean) => {
    // one function handles both like and unlikex
    return isLiked ? postsApi.unlike(postId) : postsApi.like(postId);
  },
};
