// types/index.ts
export type Post = {

  id: number

  image_url: string

  caption: string

  created_at: string

  is_liked: boolean

  likes_count: number

  comments_count: number

  user: {

    id: number

    username: string

    profile_image_url: string | null
  }
}

export type LoginPayload = {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: UserResponse
}

export type SignupPayload = {
  username: string
  email: string
  password: string
}

export type UserResponse = {
  id: number
  username: string
  email: string
  profile_image_url?: string
  created_at: string
  bio: string
}

export type User = {
  id: number
  username: string
  email: string
  profile_image_url?: string
  created_at: string
  bio: string
}