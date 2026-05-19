'use client'

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { postService } from "@/lib/services/postService"

type CreatePostModalProps = {
  isOpen: boolean
  onClose: () => void
  onPostCreated?: () => void
}

export default function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
}: CreatePostModalProps) {
  const [image, setImage] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)

  const previewUrl = useRef<string | null>(null)

  // Revoke previous URL before creating a new one — prevents memory leak
  if (previewUrl.current) {
    URL.revokeObjectURL(previewUrl.current)
  }
  previewUrl.current = image ? URL.createObjectURL(image) : null

  // Revoke on unmount
  useEffect(() => {
    return () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    }
  }, [])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setImage(null)
      setCaption("")
      setLoading(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setImage(file)
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  async function handleSubmit() {
    if (!image) {
      alert("Please select image")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("image", image)
      formData.append("caption", caption)

      await postService.createPost(formData)

      onClose()
      onPostCreated?.()

      window.location.reload()

    } catch (error) {
      console.error("Failed to create post", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="relative flex w-full max-w-lg flex-col gap-5 rounded-2xl border border-primary-2 bg-primary-1 p-6 text-secondary-1 max-h-[90vh] overflow-y-auto sm:p-8">

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 cursor-pointer text-secondary-1 transition hover:opacity-70"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold">Create Post</h2>

        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer rounded-lg border p-3"
          />
        </div>

        {/* Preview */}
        {previewUrl.current && (
          <img
            src={previewUrl.current}
            alt="Selected image preview"
            className="max-h-80 w-full rounded-xl object-cover"
          />
        )}

        {/* Caption */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows={4}
            className="resize-none rounded-lg border p-3"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`rounded-xl bg-secondary-1 py-3 font-semibold text-primary-2 transition ${
            loading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-90"
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  )
}