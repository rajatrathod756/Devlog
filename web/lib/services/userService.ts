import { userApi } from "@/lib/api/user"

import {
  useAuthStore
} from "@/lib/stores/authStore"

export const userService = {
  getProfile: async (userId: number) => {

    const data = await userApi.getProfile(
      userId
    )

    return data
  },
  getMyPosts: async (
  cursor?: number
) => {

  return await userApi.getMyPosts(
    cursor
  )
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
  }
}

