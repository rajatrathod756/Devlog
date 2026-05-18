"use client";

import { useEffect, useState, useRef } from "react";

import { usePostMutations } from "@/lib/hooks/usePost";

import type { UserPost } from "@/types/post";

import PostGridItem from "@/components/posts/PostGridItem";

export default function ProfilePostsGrid({ userId }: { userId: number }) {
  const [posts, setPosts] = useState<UserPost[]>([]);

  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const {data}= usePostMutations(userId).postQuery
 
 

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        gap-3
        "
    >
      {data?.map((post) => (
        <PostGridItem key={post.id} id={post.id} imageUrl={post.image_url} />
      ))}

      <div ref={observerRef} />

      {loading && <p className="col-span-3 text-center py-4">Loading...</p>}
    </div>
  );
}
