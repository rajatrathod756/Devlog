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
<div className="flex h-screen overflow-hidden">

  {/* Left Sidebar */}
  <aside className="w-[260px] border-r sticky top-0 overflow-hidden">
    <div className="p-4 h-full">
      <LeftSidebar />
    </div>
  </aside>

  {/* Dynamic Content */}
  <main className="flex-1 overflow-y-auto">
    {children}
  </main>

</div>
</div>
  )
}