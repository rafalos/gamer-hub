import React from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className='w-full max-w-[800px] relative'>
      <SearchIcon className='absolute right-4 top-3'/>
      <Input className='w-full border-primary border-2 h-12 rounded-2xl' placeholder='Search for games...'/>
    </div>
  );
};

export default Search;
