export type UserPost = {

  id: number

  image_url: string

  caption: string | null
}


export type UserPostsResponse = {

  posts: UserPost[]

  next_cursor: number | null

  has_more: boolean
}

export type PostDetail = {

  id: number

  image_url: string

  caption: string | null

  created_at: string

  user: {
    id: number
    username: string
    profile_image_url: string | null
  }

  comments: {
    id: number
    content: string
  }[]
}