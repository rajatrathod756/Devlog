"use client";

import { use, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { postService } from "@/lib/services/postService";

import type { PostDetail } from "@/types/post";

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function PostPage({ params }: PostPageProps) {
  const router = useRouter();

  const resolvedParams = use(params);

  const [post, setPost] = useState<PostDetail | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(Number(resolvedParams.id));

        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [resolvedParams.id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!post) {
    return <div className="p-10">Post not found</div>;
  }

  return (
    <div
      className="
        min-h-screen

        flex
        items-center
        justify-center

        p-8

        relative
      "
    >
      {/* BACK BUTTON */}

      <button
        onClick={() => router.back()}
        title="Go Back"
        className="
          absolute

          top-6
          left-6

          p-3

          rounded-full

          bg-white

          shadow-md

          hover:scale-105

          transition

          cursor-pointer
        "
      >
        <ArrowLeft size={22} />
      </button>

      {/* POST */}

      <div
        className="
          max-w-5xl
          w-full

          bg-primary-2

          rounded-2xl

          overflow-hidden

          shadow-lg

          flex
          flex-col
          md:flex-row
        "
      >
        {/* IMAGE */}

        <div
          className="
            flex-1

            bg-black

            flex
            items-center
            justify-center
          "
        >
          <img
            src={post.image_url}
            alt="post"
            className="
              w-full

              max-h-[85vh]

              object-contain
            "
          />
        </div>

        {/* SIDEBAR */}

        <div
          className="
            w-full
            md:w-96

            p-6

            flex
            flex-col

            gap-4
          "
        >
          {/* USER */}

          <div
            className="
              flex
              items-center

              gap-3
            "
          >
            <img
              src={post.user.profile_image_url || "https://placehold.co/50"}
              alt="profile"
              className="
                w-12
                h-12

                rounded-full

                object-cover
              "
            />

            <div>
              <p className="font-bold">{post.user.username}</p>
            </div>
          </div>

          {/* CAPTION */}

          <p
            className="
              text-secondary-1

              opacity-90

              leading-relaxed
            "
          >
            {post.caption}
          </p>

          {/* COMMENTS */}

          <div
            className="
              flex
              flex-col

              gap-3

              mt-4
            "
          >
            <h3 className="font-semibold">Comments</h3>

            {post.comments.length === 0 && (
              <p className="text-sm opacity-60">No comments yet</p>
            )}

            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="
      flex

      gap-3

      bg-primary-2

      p-3

      rounded-xl

      border

      border-[var(--color-secondary-3)]
    "
              >
                {/* PROFILE IMAGE */}

                <img
                  src={
                    comment.user.profile_image_url || "https://placehold.co/40"
                  }
                  alt="profile"
                  className="
        w-10
        h-10

        rounded-full

        object-cover

        flex-shrink-0
      "
                />

                {/* COMMENT CONTENT */}

                <div
                  className="
        flex
        flex-col

        gap-1
      "
                >
                  {/* USERNAME */}

                  <div
                    className="
          flex
          items-center

          gap-2
        "
                  >
                    <p
                      className="
            font-semibold

            text-sm

            text-secondary-1
          "
                    >
                      {comment.user.username}
                    </p>

                    <span
                      className="
            text-xs

            text-gray-400
          "
                    >
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* COMMENT */}

                  <p
                    className="
          text-sm

          text-secondary-1

          leading-relaxed
        "
                  >
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
