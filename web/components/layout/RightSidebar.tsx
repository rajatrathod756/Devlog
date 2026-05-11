import ProfileCard
  from "../profile/ProfileCard"

import CreatePostButton
  from "../post/CreatePostButton"


export default function RightSidebar() {

  return (

    <aside
      className="
        border-l
        p-4

        flex
        flex-col
        gap-4
      "
    >

      <ProfileCard />

      <div
        className="
          flex
          justify-center
        "
      >

        <CreatePostButton />

      </div>

    </aside>
  )
}