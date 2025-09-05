'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!query) return;

    router.push(`/home/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className='w-full max-w-[800px] relative'>
      <SearchIcon className='absolute right-4 top-3' />
      <Input
        type='search'
        onKeyDown={({ code }) => {
          if (code === 'Enter') {
            handleSearch();
          }
        }}
        className='w-full border-primary border-2 h-12 rounded-2xl'
        placeholder='Search for games...'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
};

export default Search;
