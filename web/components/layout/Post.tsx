"use client";
import Image from "next/image";
type Props = {
    id : number;
    image_url: string;
    caption: string;
}
export default function Post({ id, image_url, caption }: Props) {
    return(
        <div className="w-full border border-[var(--color-secondary-3)] p-4 text-secondary-1 mt-5">
            <Image
    src={image_url}
    alt={`Post ${id}`}
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain"
  />
            <h3>{caption}</h3>
        </div>
    )
}