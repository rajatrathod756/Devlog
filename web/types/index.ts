// types/index.ts
export interface Post {
  id: number
  image_url: string
  caption: string | null
  created_at: string
  
}

export type LoginPayload = {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
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
}

export type User = {
  id: number
  username: string
  email: string
  profile_image_url?: string
  created_at: string
}