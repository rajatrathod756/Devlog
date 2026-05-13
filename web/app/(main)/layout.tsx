'use client'
import LeftSidebar from '@/components/layout/LeftSidebar'
import Feed from '@/components/layout/Feed'
import RightSidebar from '@/components/layout/RightSidebar'


import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SearchBar from '@/components/layout/SearchBar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
})  {

  const router = useRouter()

  return (
<div className="h-screen flex flex-col overflow-hidden">
  
  {/* Top Search Bar */}
  <div className="border-b border-secondary-2 py-4">
  <div className="flex justify-center">
    
    {/* left spacer */}
    <div className="flex-1 max-w-[260px]" />

    {/* feed-aligned search */}
    <div className="w-full max-w-2xl px-4">
      <SearchBar />
    </div>

    {/* right spacer */}
    <div className="flex-1 max-w-[320px]" />

  </div>
</div>

  {/* Main Layout */}
  <div className="flex flex-1 overflow-hidden justify-center gap-6">

    {/* Left Sidebar */}
    <aside className="flex-1 flex justify-end max-w-[260px] overflow-y-auto">
  <div className="w-full p-4">
    <LeftSidebar />
  </div>
</aside>

    {/* Feed */}
    <main className="w-full max-w-2xl overflow-y-auto scrollbar-thin px-4">
      {children}
    </main>

    {/* Right Sidebar */}
    <aside className="flex-1 max-w-[320px] overflow-y-auto">
      <RightSidebar />
    </aside>

  </div>
</div>
  )
}