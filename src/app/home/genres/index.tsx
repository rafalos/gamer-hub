import { getGenres } from '@/db/queries';
import React from 'react';

const Genres = async () => {
  const genres = await getGenres();

  console.log(genres);
  return (
    <div className='flex flex-wrap gap-2'>
      {genres.map(({ id, name }) => (
        <div
          key={id}
          className='bg-white border font-bold border-black p-1 px-2 rounded-md hover:bg-accent hover:cursor-pointer transition-colors'
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default Genres;
