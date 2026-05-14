"use client";

import { useState } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import FavoriteBorderRoundedIcon
from "@mui/icons-material/FavoriteBorderRounded";

import FavoriteRoundedIcon
from "@mui/icons-material/FavoriteRounded";

import ChatBubbleOutlineRoundedIcon
from "@mui/icons-material/ChatBubbleOutlineRounded";

import type {
  Post as PostType
} from "@/types";

import {
  usePostMutations
} from "@/lib/hooks/usePost";

import {
  commentService
} from "@/lib/services/commentService";


export default function Post({
  post
}: {
  post: PostType
}) {

  const router = useRouter();

  const {
    toggleLikeMutation
  } = usePostMutations();

  const [showCommentBox, setShowCommentBox] =
    useState(false);

  const [comment, setComment] =
    useState("");


  const handleLike = () => {

    toggleLikeMutation.mutate({

      postId: post.id,

      isLiked: post.is_liked,
    });

    post.is_liked = !post.is_liked;

    post.likes_count +=
      post.is_liked ? 1 : -1;
  };


  return (

    <div
      className="
        w-full

        border-2

        border-primary-2

        bg-primary-1

        rounded-2xl

        overflow-hidden

        shadow-sm

        hover:shadow-md

        transition

        duration-300
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center

          gap-3

          px-4
          py-3
        "
      >

        <img
          src={
            post.user?.profile_image_url ||
            "https://placehold.co/50"
          }

          alt="profile"

          className="
            w-11
            h-11

            rounded-full

            object-cover

            border-2
            border-secondary-1
          "
        />

        <div>

          <h3
            className="
              font-semibold
              text-secondary-1
            "
          >
            {post.user?.username}
          </h3>

          <p
            className="
              text-xs
              text-gray-400
            "
          >
            {new Date(
              post.created_at
            ).toLocaleDateString()}
          </p>

        </div>

      </div>


      {/* IMAGE */}

      <div
        className="
          w-full

          max-h-[650px]

          overflow-hidden

          bg-primary-1

          flex
          items-center
          justify-center
        "
      >

        <Image
          loading="eager"

          src={post.image_url}

          alt={`Post ${post.id}`}

          width={0}

          height={0}

          sizes="100vw"

          className="
            w-full

            h-auto

            max-h-[650px]

            object-contain
          "
        />

      </div>


      {/* BODY */}

      <div
        className="
          p-4

          flex
          flex-col

          gap-3
        "
      >

        {/* CAPTION */}

        <p
          className="
            text-secondary-1

            leading-relaxed
          "
        >
          {post.caption}
        </p>


        {/* ACTIONS */}

        <div
          className="
            flex
            items-center

            gap-5
          "
        >

          {/* LIKE */}

          <button
            onClick={handleLike}

            className="
              cursor-pointer

              transition-transform
              duration-200

              hover:scale-125
            "
          >

            {post.is_liked ? (

              <FavoriteRoundedIcon
                sx={{
                  color: "#ef4444",
                  fontSize: 32,
                }}
              />

            ) : (

              <FavoriteBorderRoundedIcon
                sx={{
                  fontSize: 32,
                }}
              />

            )}

          </button>


          {/* COMMENT */}

          <button
            onClick={() =>
              setShowCommentBox(
                !showCommentBox
              )
            }

            className="
              cursor-pointer

              transition-transform
              duration-200

              hover:scale-110
            "
          >

            <ChatBubbleOutlineRoundedIcon
              sx={{
                fontSize: 30,
              }}
            />

          </button>

        </div>


        {/* COUNTS */}

        <div
          className="
            flex
            flex-col

            gap-1
          "
        >

          <p
            className="
              text-sm

              font-semibold

              text-secondary-1
            "
          >
            {post.likes_count} likes
          </p>


          <button
            onClick={() =>
              router.push(
                `/posts/${post.id}`
              )
            }

            className="
              text-sm

              text-gray-400

              hover:text-secondary-1

              transition

              cursor-pointer

              self-start
            "
          >

           {post.comments_count > 0 && `View all ${post.comments_count} comments`}

          </button>

        </div>


        {/* COMMENT BOX */}

        {showCommentBox && (

          <div
            className="
              flex
              flex-col

              gap-3

              mt-2
            "
          >

            <textarea
              value={comment}

              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }

              placeholder="
                Write a comment...
              "

              rows={3}

              className="
                border

                rounded-xl

                p-3

                resize-none

                outline-none

                focus:ring-2
                focus:ring-secondary-1
              "
            />


            <button
              onClick={async () => {

                try {

                  await commentService.createComment(

                    post.id,

                    comment
                  );

                  setComment("");

                  setShowCommentBox(false);

                } catch (error) {

                  console.error(error);
                }
              }}

              className="
                self-end

                bg-secondary-1
                text-primary-2

                px-5
                py-2

                rounded-full

                font-medium

                cursor-pointer

                hover:opacity-90

                transition
              "
            >

              Comment

            </button>

          </div>
        )}

      </div>

    </div>
  );
}