export type Notification = {

  id: number

  type: string

  read: boolean

  post_id?: number | null

  comment_id?: number | null

  created_at: string

  actor?: {

    id: number

    username: string

    profile_image_url?: string | null
  }
}