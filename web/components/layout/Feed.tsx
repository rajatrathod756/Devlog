
import Image from "next/image";
import Post from "./Post";
interface Post {
  id: number;
  image_url: string;
  caption: string;
}

export default async function Feed() {

    const posts : Post[]= await fetch('http://localhost:8000/api/v1/feed').then(res => res.json())

    return(
        <div className="border border-[var(--color-secondary-3)] p-4 text-secondary-1">
            {posts.map((post: Post)=> <Post key={post.id} id={post.id} image_url={post.image_url} caption={post.caption} />)}
</div>
    )
}