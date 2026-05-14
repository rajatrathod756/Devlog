import NavigationMenu from "../navigtion/NavigationMenu"
import CreatePostButton from "../post/CreatePostButton"

export default function LeftSidebar() {
  return (
<aside className="flex h-full flex-col justify-between">

  <NavigationMenu />

<CreatePostButton />
  

</aside>
  )
}