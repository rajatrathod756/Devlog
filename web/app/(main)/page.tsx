'use client'
import Feed from '@/components/layout/Feed'
import RightSidebar from '@/components/layout/RightSidebar'

export default function HomePage() {
  return (
    <div className="flex justify-center gap-6 h-full">

      {/* Feed */}
      <div className="w-full max-w-2xl overflow-y-auto px-4 [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden">
        <Feed />
      </div>

      {/* Right Sidebar */}
      <aside className="w-[320px] sticky top-0 overflow-hidden">
        <RightSidebar />
      </aside>

    </div>
  )
}