'use client';

import { Button } from '@/components/ui/button';
import { useFavoriteStore } from '@/store/favorites.store.';
import React from 'react';

const Navbar = () => {
  const favourites = useFavoriteStore((state) => state.favouries);

  return (
    <nav className='h-12 w-full border-b border-black flex justify-between items-center p-4'>
      <div className='text-2xl font-bold'>GamerHub</div>
      <div>
        <Button>Sign in</Button>
      </div>
    </nav>
  );
};

export default Navbar;
