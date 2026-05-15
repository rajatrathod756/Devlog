// components/layout/Feed.tsx
import { useFeed } from '@/lib/hooks/useFeed'
import PostCard from '@/components/layout/PostCard'

export default function Feed() {
  const { posts, ref, isLoading, isFetchingNextPage, hasNextPage } = useFeed()

  if (isLoading) return <div className="p-4">Loading...</div>

  return (
    <div className="flex flex-col gap-4 p-4 scrollbar-hide">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={ref} className="h-1" />
      {isFetchingNextPage && <div>Loading more...</div>}
      {!hasNextPage && posts.length > 0 && <div>You're all caught up</div>}
    </div>
  )
}