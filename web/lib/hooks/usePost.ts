import { useMutation } from '@tanstack/react-query'
import { postService } from '@/lib/services/postService'

export function usePostMutations() {

    const toggleLikeMutation = useMutation({
    mutationFn: ({
      postId,
      isLiked
    }: {
      postId: number
      isLiked: boolean
    }) =>
      postService.toggleLike(postId, isLiked),

    
  })


  return {
    toggleLikeMutation
  }
}