import Providers from './providers'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Devlog</title>
      </head>
      <body className='bg-background-1'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}