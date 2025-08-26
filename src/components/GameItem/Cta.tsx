'use client';

import { LibrarySquare, LucideStar } from 'lucide-react';
import React from 'react';
import { addToLibrary } from './actions';
import { useFooterStore } from '@/store/footer.store.';

type Props = {
  id: number;
  isInLibrary: boolean;
};

const Actions = ({ id, isInLibrary }: Props) => {
  const increaseLibrary = useFooterStore((state) => state.increaseLibraryCount);

  return (
    <div className='flex w-full'>
      <div
        className={`text-accent ${
          isInLibrary ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary'
        } w-full rounded-bl-md flex items-center justify-center py-1 border-r hover:brightness-110`}
        onClick={async () => {
          if (isInLibrary) return alert('Game is already in library');

          const result = await addToLibrary(id.toString());
          if (result) {
            increaseLibrary();
          }
        }}
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
