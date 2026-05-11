export type ProfileResponse = {
  id: number

  name: string | null

  username: string

  bio: string | null

  profile_image_url: string | null

  followers_count: number

  following_count: number

  posts_count: number

  is_following: boolean

  follows_you: boolean
}