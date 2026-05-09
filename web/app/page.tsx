import LeftSidebar from "@/components/layout/LeftSidebar"
import Feed from "@/components/layout/Feed"
import RightSidebar from "@/components/layout/RightSidebar"
import { ThemeProvider } from '@/lib/theme/ThemeContext'
import './globals.css'

export default function HomePage() {
  return (
    <ThemeProvider initialTheme="dark">
      <html lang="en" className="bg-background-1">
        <head>
        <title>Devlog</title>
      </head>
      <body>
     
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
    </body>
    </html>
    </ThemeProvider>
    
  )
}