import ProfileCard from "@/components/profile/ProfileCard"
import ProfilePostsGrid from "@/components/profile/ProfilePostsGrid"

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <ProfileCard username={username} />
      <ProfilePostsGrid username={username} />
    </div>
  )
}