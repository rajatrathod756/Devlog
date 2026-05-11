type ProfileStatsProps = {
  posts: number
  followers: number
  following: number
}

export default function ProfileStats({
  posts,
  followers,
  following,
}: ProfileStatsProps) {

  return (
    <div className="flex gap-6 mt-4">

      <div className="flex flex-col items-center">
        <p className="font-bold text-lg">
          {posts}
        </p>

        <p className="text-sm text-gray-400">
          Posts
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-bold text-lg">
          {followers}
        </p>

        <p className="text-sm text-gray-400">
          Followers
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-bold text-lg">
          {following}
        </p>

        <p className="text-sm text-gray-400">
          Following
        </p>
      </div>

    </div>
  )
}