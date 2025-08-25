'use client';

import axios from 'axios';
import { LibrarySquare, LucideStar } from 'lucide-react';
import React from 'react';

type Props = {
  id: number;
};

const Actions = ({ id }: Props) => {
  const handleAddToLibrary = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/games/${id.toString()}`
    );

    console.log(response.data);
  };

  return (
    <div className='flex w-full'>
      <div
        className='text-accent bg-primary w-full rounded-bl-md flex items-center justify-center py-1 border-r hover:brightness-110'
        onClick={async () => handleAddToLibrary()}
      >
        <LibrarySquare className='h-6' />
      </div>

      <div className='text-accent bg-primary w-full rounded-br-md flex items-center justify-center hover:brightness-110'>
        <LucideStar className='h-6' />
      </div>
    </div>
  );
};

export default Actions;
