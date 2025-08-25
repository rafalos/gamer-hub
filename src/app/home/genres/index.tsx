import { getGenres } from '@/db/queries';
import React from 'react';

const Genres = async () => {
  const genres = await getGenres();

  console.log(genres);
  return (
    <div
      className='flex lg:flex-wrap gap-4 overflow-auto mb-4 scrollbar-hidden after:bg-white 
      after:left-0 after:h-10 after:w-10 after:absolute after:blur-md before:bg-white before:right-0 
      before:h-10 before:w-10 before:absolute before:blur-md lg:after:hidden lg:before:hidden'
    >
      {genres.map(({ id, name }) => (
        <div
          key={id}
          className='bg-white shadow-md h-8 border-black p-1 px-4 rounded-md hover:bg-accent hover:cursor-pointer transition-colors'
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default Genres;
