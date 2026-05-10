'use client'
import LeftSidebar from '@/components/layout/LeftSidebar'
import Feed from '@/components/layout/Feed'
import RightSidebar from '@/components/layout/RightSidebar'


import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.replace('/login')
    }
  }, [router])

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 flex-shrink-0">
        <LeftSidebar />
      </aside>

      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <Feed />
      </main>

      <aside className="w-80 flex-shrink-0">
        <RightSidebar />
      </aside>
    </div>
  )
}