// components/search/SearchBar.tsx
'use client'
import Link from 'next/link'
import { useSearch } from '@/lib/hooks/useSearch'
import {useRouter} from 'next/navigation'

export default function SearchBar() {
  const { query, setQuery, results, isLoading } = useSearch()
    const router = useRouter();

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setQuery(value);

        if (value.trim() === "") {
           router.push("/");
          }
      };
      const selectUser = (username : string) => {
        setQuery("");
        router.push(`/profile/${username}`);
      };
    

  return (
    <div className="relative">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search users..."
        className="w-full px-4 py-2 rounded-lg bg-primary-1 focus:outline-none border-2 border-primary-2 text-secondary-1"
      />

      {isLoading && <div className="p-2 absolute bg-primary-1">Searching...</div>}

      {results.length > 0 && (
        <div className="absolute top-full w-full bg-primary-1 rounded-lg shadow-lg z-50 border border-secondary-2">
          {results.map((user) => (
            <div
                onClick={() => selectUser(user.username)}
                key={user.id}
                className="p-3 border border-transparent hover:border-[var(--color-secondary-2)] rounded-lg cursor-pointer text-secondary-1 flex items-center gap-3 transition-colors">
              <img src={user.profile_image_url} className="w-8 h-8 rounded-full border-2 border-primary-2" />
                {user.username}
                
            </div>
          ))}
        </div>
      )}
    </div>
  )
}