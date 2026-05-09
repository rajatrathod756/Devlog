type ProfileStatsProps = {
  posts?: number
  followers?: number
  following?: number
}

export default function ProfileStats({
  posts = 120,
  followers = 500,
  following = 180,
}: ProfileStatsProps) {
  return (
    <div className="flex gap-4">
      <p>{posts} Posts</p>
      <p>{followers} Followers</p>
      <p>{following} Following</p>
    </div>
  )
}