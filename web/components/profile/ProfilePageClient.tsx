'use client'
import { useProfile } from '@/lib/hooks/useProfile'
import ProfileCard from './ProfileCard'
import ProfilePostsGrid from './ProfilePostsGrid'

export default function ProfilePageClient({ username }: { username: string }) {
  const { profile, isLoading, isOwnProfile, toggleFollow, isFollowPending } =
    useProfile(username)

  if (isLoading) return <div>Loading...</div>
  if (!profile) return <div>User not found</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <ProfileCard
        username={username}
      />
      <ProfilePostsGrid userId={profile.id} />  {/* ← id from profile */}
    </div>
  )
}