// lib/hooks/useFeed.ts
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { postService } from '@/lib/services/postService'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { FeedResponse } from '@/types/feed'

export function useFeed() {
  const { ref, inView } = useInView()

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError
} = useInfiniteQuery<
  FeedResponse,
  Error,
  InfiniteData<FeedResponse>,
  string[],
  number | null
>({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) =>
    postService.getFeed(pageParam),

  getNextPageParam: (lastPage) =>
    lastPage.has_more
      ? lastPage.next_cursor
      : undefined,

  initialPageParam: null,
})

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, hasNextPage])

  const posts = data?.pages.flatMap((page) => page.posts) ?? []

  return {
    posts,
    ref,           // attach to sentinel div
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage
  }
}