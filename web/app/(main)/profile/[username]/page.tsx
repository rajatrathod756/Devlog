import ProfileCard from "@/components/profile/ProfileCard"
import ProfilePostsGrid from "@/components/profile/ProfilePostsGrid"
import ProfilePageClient from "@/components/profile/ProfilePageClient"

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params

  return <ProfilePageClient username={username} />
}