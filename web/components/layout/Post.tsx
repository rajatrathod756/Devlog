"use client";
import Image from "next/image";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import type { Post as PostType } from '@/types'

export default function Post({ post }: { post: PostType }) {
    return(
       <div className="w-full border border-[var(--color-secondary-3)] p-4 text-secondary-1 mt-5 rounded-lg">
  
  {/* Constrain image size */}
  <div className="w-full max-h-[500px] overflow-hidden rounded-md flex items-center justify-center bg-primary-1">
    <Image
      src={post.image_url}
      alt={`Post ${post.id}`}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto max-h-[500px] object-contain"
    />
  </div>

  <h3 className="text-secondary-1 mt-3">{post.caption}</h3>
  <p className="text-xs text-muted-foreground">
    {new Date(post.created_at).toLocaleDateString()}
  </p>
  <div>
    <button className="px-4 py-2">
      <FavoriteBorderIcon />
    </button>
    <button className="px-4 py-2">
      <InsertCommentIcon />
    </button>
  </div>
</div>
    )
}