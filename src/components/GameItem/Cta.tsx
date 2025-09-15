'use client';

import { LoaderCircle, LucideHeart, PlusCircle } from 'lucide-react';
import React, { startTransition, useActionState, useEffect } from 'react';
import { ctaAction } from './actions';
import { useFooterStore } from '@/store/footer.store';
import { Button } from '@/components/ui/button';

type Props = {
  id: number;
  isInLibrary: boolean;
  isWishlisted: boolean;
};

const Cta = ({ id, isInLibrary, isWishlisted }: Props) => {
  const increaseLibrary = useFooterStore((state) => state.increaseLibraryCount);
  const [addedSuccesfully, action, pending] = useActionState(ctaAction, false);

  useEffect(() => {
    if (addedSuccesfully) increaseLibrary();
  }, [addedSuccesfully, increaseLibrary]);

  return (
    <div className='flex divide-x'>
      {pending ? (
        <span className='mx-auto p-1'>
          <LoaderCircle className='w-4 animate-spin' />
        </span>
      ) : (
        <>
          <Button
            variant='ghost'
            disabled={isInLibrary}
            className=' flex-1 cursor-pointer rounded-none'
            onClick={() => {
              if (isInLibrary) return;
              startTransition(() => {
                action({
                  actionType: 'library',
                  rawg_id: id.toString(),
                });
              });
            }}
          >
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
          </Button>

          <Button
            variant='ghost'
            className='flex-1 cursor-pointer'
            disabled={isWishlisted}
            onClick={() => {
              if (isWishlisted) return;
              startTransition(() => {
                action({
                  actionType: 'wishlist',
                  rawg_id: id.toString(),
                });
              });
            }}
          >
            {isWishlisted ? (
              'Wishlisted'
            ) : (
              <>
                <LucideHeart
                  fill={isWishlisted ? 'black' : 'white'}
                  stroke={isWishlisted ? 'white' : 'black'}
                  className='w-4'
                />
                wishlist
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default Cta;
