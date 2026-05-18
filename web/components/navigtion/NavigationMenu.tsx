'use client'

import {
  Home,
  Compass,
  Bell,
  Bookmark,
  LogOut,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import NavItem from './NavItem'

import { logout } from '@/lib/utils/logout'

export default function NavigationMenu() {

  const router = useRouter()

  return (
    <nav className="flex flex-col gap-2">

      <NavItem
        label="Home"
        icon={<Home size={18} />}
        onClick={() => {router.push("/")}}
      />

      <NavItem
        label="Explore"
        icon={<Compass size={18} />}
        disabled
      />

      <NavItem
        label="Notifications"
        icon={<Bell size={18} />}
        disabled
      />

      <NavItem
        label="Bookmarks"
        icon={<Bookmark size={18} />}
        disabled
      />

      <NavItem
        label="Logout"
        icon={<LogOut size={18} />}
        onClick={logout}
      />

    </nav>
  )
}