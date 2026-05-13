import { http }
from "@/lib/http"


export const commentsApi = {

  create: (

    postId: number,

    content: string

  ) =>

    http.post(

      `/posts/${postId}/comments`,

      { content }
    ),
}