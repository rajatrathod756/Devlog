'use client'

import {
  useState
} from "react"

import CreatePostModal
  from "./CreatePostModal"


export default function CreatePostButton() {

  const [open, setOpen] =
    useState(false)


  return (

    <>

      <button
        onClick={() => setOpen(true)}

        className="
          bg-secondary-1
          text-primary-2

          px-6
          py-3

          rounded-full

          font-semibold

          cursor-pointer

          hover:opacity-90

          transition

          shadow-md

          w-full

          flex
          items-center
          justify-center
        "
      >

        Create Post

      </button>


      <CreatePostModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </>
  )
}