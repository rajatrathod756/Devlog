

export type PostFeedItem = {
    id: number
    image_url: string
    caption: string | null
    user_id: number 
    created_at: string
    is_liked: boolean
}
export type FeedResponse = {
  posts: PostFeedItem[]
  next_cursor: number | null
  has_more: boolean
}