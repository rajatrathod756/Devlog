// lib/hooks/useSearch.ts
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/lib/services/userService'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // debounce — only update debouncedQuery 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)  // cleanup on each keystroke
  }, [query])

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => userService.searchUsers(debouncedQuery),
    enabled: debouncedQuery.length > 1,  // don't search empty or single char
  })

  return {
    query,
    setQuery,
    results: data?.users ?? [],
    isLoading: isLoading && debouncedQuery.length > 1
  }
}