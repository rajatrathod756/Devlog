'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import PostCard from '@/components/layout/Post'
import type { Post as PostType } from '@/types'
import { postService } from '@/lib/services/postService'

// in useInfiniteQuery


type FeedPage = {
  posts: PostType[]
  next_cursor: number | null
  has_more: boolean
}

export default function Feed() {
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<FeedPage, Error, FeedPage, string[], number | null>({
      queryKey: ['feed'],
      queryFn: ({ pageParam }) => postService.getFeed(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.has_more ? lastPage.next_cursor : undefined,
      initialPageParam: null
    })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, hasNextPage])

  const posts = data?.pages.flatMap((page) => page.posts) ?? []

  if (isLoading) return <div className="p-4">Loading feed...</div>

  return (
    <div className="flex flex-col gap-4 p-4">
      {posts.map((post : PostType) => (
        
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={ref} className="h-1" />

      {isFetchingNextPage && (
        <div className="text-center py-4 text-secondary-1">
          Loading more...
        </div>
      )}

      {!hasNextPage && posts.length > 0 && (
        <div className="text-center py-4 text-secondary-1">
          You're all caught up
        </div>
      )}
    </div>
  )
}