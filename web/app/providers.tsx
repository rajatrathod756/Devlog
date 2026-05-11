'use client'

import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/lib/theme/ThemeContext'
import { useState } from 'react'
import { ApiError } from '@/lib/errors'



export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,        
            retry: (failureCount, error) => {
             
              if (error instanceof ApiError) {
                if ([401, 404].includes(error.status)) return false
              }
              return failureCount < 2
            },
          },
          mutations: {
            retry: false,                
          },
        },
        mutationCache: new MutationCache({
          onSettled: () => {
          queryClient.invalidateQueries()
          },
        }),
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider initialTheme="dark">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}