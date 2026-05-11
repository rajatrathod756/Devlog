import { postsApi } from '@/lib/api/posts'
import type { Post } from '@/types'

export const postService = {
  getFeed: async (cursor: number | null = null) => {
    const data = await postsApi.getFeed(cursor)
    return data
  },

  getPost: async (postId: number) => {
    const post = await postsApi.getById(postId)
    return post
  },

  createPost: async (caption: string, imageUrl: string) => {
    // business logic lives here
    // e.g. validate caption length, format data
    if (caption && caption.length > 2200) {
      throw new Error('Caption cannot exceed 2200 characters')
    }
    return postsApi.create({ caption, image_url: imageUrl })
  },

  deletePost: async (postId: number) => {
    return postsApi.delete(postId)
  },

  toggleLike: async (postId: number, isLiked: boolean) => {
    // one function handles both like and unlikex
    return isLiked
      ? postsApi.unlike(postId)
      : postsApi.like(postId)
  },
}