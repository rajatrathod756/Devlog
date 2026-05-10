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