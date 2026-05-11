"use client";

import { useEffect, useState, useRef } from "react";

import { userService } from "@/lib/services/userService";

import type { UserPost } from "@/types/post";

import PostGridItem from "@/components/posts/PostGridItem";

export default function ProfilePostsGrid() {
  const [posts, setPosts] = useState<UserPost[]>([]);

  const [cursor, setCursor] = useState<number | null>(null);

  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const data = await userService.getMyPosts(cursor || undefined);

      setPosts((prev) => {
        const existingIds = new Set(prev.map((post) => post.id));

        const newPosts = data.posts.filter((post) => !existingIds.has(post.id));

        return [...prev, ...newPosts];
      });

      setCursor(data.next_cursor);

      setHasMore(data.has_more);
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts();
        }
      },

      {
        threshold: 1,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [cursor, hasMore]);

  return (
    <div
      className="
        grid
        grid-cols-2
sm:grid-cols-3

gap-3
      "
    >
      {posts.map((post) => (
        <PostGridItem key={post.id} id={post.id} imageUrl={post.image_url} />
      ))}

      <div ref={observerRef} />

      {loading && <p className="col-span-3 text-center py-4">Loading...</p>}
    </div>
  );
}
