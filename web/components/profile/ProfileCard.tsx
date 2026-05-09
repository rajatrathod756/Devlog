import ProfileStats from "./ProfileStats"

export default function ProfileCard() {
  return (
    <div className="bg-primary-2 text-secondary-1 p-4">
      <img
        src="https://placehold.co/100"
        alt="profile"
        className="rounded-full"
      />

      <h2 >Rajat</h2>

      <ProfileStats />
    </div>
  )
}