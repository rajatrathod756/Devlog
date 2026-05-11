'use client'

import Link from "next/link"

type PostGridItemProps = {
  id: number
  imageUrl: string
}

export default function PostGridItem({
  id,
  imageUrl
}: PostGridItemProps) {

  return (

    <Link href={`/posts/${id}`}>

      <div
        className="
          relative

          aspect-square

          overflow-hidden

          rounded-md

          cursor-pointer

          group

          bg-gray-100
          border-1
        "
      >

        <img
          src={imageUrl}
          alt="post"

          loading="lazy"

          className="
            absolute
            inset-0

            w-full
            h-full

            object-cover

            group-hover:scale-105

            transition-transform
            duration-300
          "
        />

      </div>

    </Link>
  )
}