// lib/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/lib/services/userService'
import { useAuthStore } from '@/lib/stores/authStore'

export function useProfile(username: string) {
  const currentUser = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => userService.getProfile(username),
  })

  // is this the logged in user's own profile?
  const isOwnProfile = currentUser?.username === username

  const followMutation = useMutation({
    mutationFn: () => userService.followUser(data!.id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] })
    }
  })

  const unfollowMutation = useMutation({
    mutationFn: () => userService.unfollowUser(data!.id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] })
    }
  })

  const toggleFollow = () => {
    data?.is_following
      ? unfollowMutation.mutate()
      : followMutation.mutate()
  }

  return {
    profile: data,
    isLoading,
    isError,
    isOwnProfile,      // ← this drives conditional UI
    toggleFollow,
    isFollowPending: followMutation.isPending || unfollowMutation.isPending
  }
}