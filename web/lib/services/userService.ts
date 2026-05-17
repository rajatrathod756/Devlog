import { userApi } from "@/lib/api/user"

import {
  useAuthStore
} from "@/lib/stores/authStore"

export const userService = {
  getProfile: async (username: string) => {

    const data = await userApi.getProfile(
      username
    )

    return data
  },

 updateProfile: async (

    payload: FormData

  ) => {

    const updatedUser =
      await userApi.updateMe(
        payload
      )

    const token =
      useAuthStore
        .getState()
        .token

    useAuthStore
      .getState()
      .setAuth(
        updatedUser,
        token!
      )

    return updatedUser
  },

  searchUsers: async (query : string) => {
    const data = await userApi.searchUsers(query)
    return data
  },
  followUser: async (userId: number) => {
    await userApi.followUser(userId)
  },
  unfollowUser: async (userId: number) => {
    await userApi.unfollowUser(userId)
  },
}

