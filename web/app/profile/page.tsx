import ProfileCard from "@/components/profile/ProfileCard"
import ProfilePostsGrid from "@/components/profile/ProfilePostsGrid"

export default function ProfilePage() {

  return (
    <div
      className="
        max-w-5xl
        mx-auto
        px-4
        py-8
        flex
        flex-col
        gap-8
      "
    >

      <ProfileCard />

      <ProfilePostsGrid />

    </div>
  )
}