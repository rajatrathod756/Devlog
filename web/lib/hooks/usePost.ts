import { useMutation, useQuery } from '@tanstack/react-query'
import { postService } from '@/lib/services/postService'

export function usePostMutations(id: number) {
  const postQuery = useQuery({
    queryKey: ['posts', id],
    queryFn: () => postService.getPostsByUser(id),
  })

  const toggleLikeMutation = useMutation({
    mutationFn: ({
      postId,
      isLiked,
    }: {
      postId: number
      isLiked: boolean
    }) => postService.toggleLike(postId, isLiked),
  })

  return {
    postQuery,
    toggleLikeMutation,
  }
}