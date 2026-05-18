"use client";

import { Home, Compass, Bell, Bookmark, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import NavItem from "./NavItem";

import { logout } from "@/lib/utils/logout";

import { useState } from "react";

import NotificationsPanel from "../notifications/NotificationsPanel";

import { useNotifications } from "@/lib/hooks/useNotifications";

export default function NavigationMenu() {
  const router = useRouter();

  const [openNotifications, setOpenNotifications] = useState(false);

  const { unreadCount, markAllRead } = useNotifications();

  return (
    <nav className="flex flex-col gap-2">
      <NavItem
        label="Home"
        icon={<Home size={18} />}
        onClick={() => {
          router.push("/");
        }}
      />

      <NavItem label="Explore" icon={<Compass size={18} />} disabled />

      <div className="relative">
        <div className="relative">
          <NavItem
            label="Notifications"
            icon={<Bell size={18} />}
            onClick={async () => {
              setOpenNotifications((prev) => !prev);

              await markAllRead();
            }}
          />

          {unreadCount > 0 && (
            <div
              className="
          absolute

          top-1
          right-2

          min-w-5
          h-5

          px-1

          rounded-full

          bg-red-500

          text-white

          text-xs

          flex
          items-center
          justify-center
        "
            >
              {unreadCount}
            </div>
          )}
        </div>

        <NotificationsPanel open={openNotifications} />
      </div>

      <NavItem label="Bookmarks" icon={<Bookmark size={18} />} disabled />

      <NavItem label="Logout" icon={<LogOut size={18} />} onClick={logout} />
    </nav>
  );
}
