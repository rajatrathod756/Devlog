import { http } from "@/lib/http";

import type { ProfileResponse } from "@/types/profile";
import type { UserPostsResponse } from "@/types/post";

export const userApi = {
  getProfile: (userId: number) => http.get<ProfileResponse>(`/users/${userId}`),
  getMyPosts: (cursor?: number) => {
    const query = cursor ? `?cursor=${cursor}` : "";

    return http.get<UserPostsResponse>(`/users/me/posts${query}`);
  },
};
