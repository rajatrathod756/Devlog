import {
  commentsApi
} from "@/lib/api/comments"


export const commentService = {

  createComment: async (

    postId: number,

    content: string

  ) => {

    if (!content.trim()) {

      throw new Error(
        "Comment cannot be empty"
      )
    }

    return commentsApi.create(

      postId,

      content
    )
  }
}