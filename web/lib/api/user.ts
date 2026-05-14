import { http } from "@/lib/http";

import type { ProfileResponse } from "@/types/profile";
import type { UserPostsResponse } from "@/types/post";

export const userApi = {
  getProfile: (username: string) => http.get<ProfileResponse>(`/users/${username}`),
  getMyPosts: (cursor?: number) => {
    const query = cursor ? `?cursor=${cursor}` : "";

    return http.get<UserPostsResponse>(`/users/me/posts${query}`);
  },
  updateMe: (payload: FormData) =>
    http.patch(
      "/users/me",
      payload,
    ),
  searchUsers: (query: string) =>
    http.get<{ users: ProfileResponse[] }>(`/users/search/${encodeURIComponent(query)}`),
  followUser: (userId: number) => http.post(`/users/${userId}/follow`),
  unfollowUser: (userId: number) => http.delete(`/users/${userId}/follow`),
};
