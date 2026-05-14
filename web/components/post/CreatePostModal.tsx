'use client'

import {
  useState
} from "react"

import {
  X
} from "lucide-react"

import {
  postService
} from "@/lib/services/postService"


type CreatePostModalProps = {

  isOpen: boolean

  onClose: () => void

  onPostCreated?: () => void
}


export default function CreatePostModal({

  isOpen,

  onClose,

  onPostCreated

}: CreatePostModalProps) {

  const [image, setImage] =
    useState<File | null>(null)

  const [caption, setCaption] =
    useState("")

  const [loading, setLoading] =
    useState(false)


  if (!isOpen) return null


  const handleSubmit = async () => {

    if (!image) {
      alert("Please select image")
      return
    }

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append(
        "image",
        image
      )

      formData.append(
        "caption",
        caption
      )

      await postService.createPost(
        formData
      )

      onClose()

      onPostCreated?.()

      window.location.reload()

    } catch (error) {

      console.error(
        "Failed to create post",
        error
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <div
      className="
        fixed
        inset-0

       

        flex
        items-center
        justify-center

        z-50
      "
    >

      <div
        className="
          bg-primary-1
          text-secondary-1
          border
          border-primary-2

          w-full
          max-w-lg

          rounded-2xl

          p-6

          relative

          flex
          flex-col

          gap-5
        "
      >

        {/* CLOSE */}

        <button
          onClick={onClose}

          className="
            absolute
            top-4
            right-4
            text-secondary-1
            cursor-pointer
          "
        >

          <X size={22} />

        </button>


        {/* TITLE */}

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Create Post
        </h2>


        {/* FILE INPUT */}

        <div
          className="
            flex
            flex-col

            gap-2
          "
        >

          <label className="font-medium">
            Upload Image
          </label>

          <input
            type="file"

            accept="image/*"

            onChange={(e) => {

              if (
                e.target.files &&
                e.target.files[0]
              ) {

                setImage(
                  e.target.files[0]
                )
              }
            }}

            className="
              border

              p-3

              rounded-lg

              cursor-pointer
            "
          />

        </div>


        {/* PREVIEW */}

        {image && (

          <img
            src={URL.createObjectURL(image)}

            alt="preview"

            className="
              w-full

              max-h-80

              object-cover

              rounded-xl
            "
          />
        )}


        {/* CAPTION */}

        <div
          className="
            flex
            flex-col

            gap-2
          "
        >

          <label className="font-medium">
            Caption
          </label>

          <textarea
            value={caption}

            onChange={(e) =>
              setCaption(
                e.target.value
              )
            }

            placeholder="
              Write a caption...
            "

            rows={4}

            className="
              border

              rounded-lg

              p-3

              resize-none
            "
          />

        </div>


        {/* BUTTON */}

        <button
          onClick={handleSubmit}

          disabled={loading}

          className={`
            bg-secondary-1
            text-primary-2

            py-3

            rounded-xl

            font-semibold

            transition

            ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90"
            }
          `}
        >

          {loading
            ? "Posting..."
            : "Post"}

        </button>

      </div>

    </div>
  )
}