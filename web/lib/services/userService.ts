import { userApi } from "@/lib/api/user"

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
}
}

