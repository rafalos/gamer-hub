'use client';

import { LoaderCircle, LucideHeart, PlusCircle } from 'lucide-react';
import React, { startTransition, useActionState, useEffect } from 'react';
import { addToLibraryAction } from './actions';
import { useFooterStore } from '@/store/footer.store.';
import { Button } from '@/components/ui/button';

type Props = {
  id: number;
  isInLibrary: boolean;
};

const Cta = ({ id, isInLibrary }: Props) => {
  const increaseLibrary = useFooterStore((state) => state.increaseLibraryCount);
  const [addedSuccesfully, action, pending] = useActionState(
    addToLibraryAction,
    false
  );

  useEffect(() => {
    if (addedSuccesfully) increaseLibrary();
  }, [addedSuccesfully, increaseLibrary]);

  return (
    <div className='flex divide-x'>
      <Button
        variant='ghost'
        disabled={isInLibrary}
        className=' flex-1 cursor-pointer rounded-none'
        onClick={() => {
          if (isInLibrary) return;
          startTransition(() => {
            action(id.toString());
          });
        }}
      >
        {pending ? (
          <span>
            <LoaderCircle className='w-4 animate-spin' />
          </span>
        ) : (
          <span className='text-sm flex gap-2 items-center'>
            {isInLibrary ? (
              'In library'
            ) : (
              <>
                <PlusCircle className='w-4' />
                library
              </>
            )}
          </span>
        )}
      </Button>

      <Button variant='ghost' className='flex-1 cursor-pointer'>
        <LucideHeart
          fill={isInLibrary ? 'black' : 'white'}
          stroke={isInLibrary ? 'white' : 'black'}
          className='w-4'
        />
        like
      </Button>
    </div>
  );
};

export default Cta;
