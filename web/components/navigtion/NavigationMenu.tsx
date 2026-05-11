import NavItem from "./NavItem";

import { logout } from "@/lib/utils/logout";

export default function NavigationMenu() {
  return (
    <nav className="flex flex-col gap-2">
      <NavItem label="Home" />

      <NavItem label="Explore" disabled />

      <NavItem label="Notifications" disabled />

      <NavItem label="Bookmarks" disabled />

      <NavItem label="Logout" onClick={logout} />
    </nav>
  );
}
