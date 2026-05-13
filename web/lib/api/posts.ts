import { http } from "@/lib/http";
import type { PostFeedItem } from "@/types/feed";
import type { Post } from "@/types";

type FeedResponse = {
  posts: PostFeedItem[];
  next_cursor: number | null;
  has_more: boolean;
};


export const postsApi = {
  getFeed: (cursor: number | null = null) =>
    http.get<FeedResponse>(
      cursor ? `/feed?cursor=${cursor}&limit=4` : `/feed?limit=4`,
    ),

  getById: (postId: number) => http.get<Post>(`/posts/${postId}`),

  create: (payload: FormData) => http.post<Post>("/posts/", payload),

  delete: (postId: number) =>
    http.delete<{ message: string }>(`/posts/${postId}`),

  like: (postId: number) =>
    http.post<{ message: string; likes_count: number }>(
      `/posts/${postId}/like`,
      {},
    ),

  unlike: (postId: number) =>
    http.delete<{ message: string; likes_count: number }>(
      `/posts/${postId}/like`,
    ),
};
