'use client'

import { useFavouriteStore } from '@/store';
import React from 'react';

const Navbar = () => {
  const favourites = useFavouriteStore((state) => state.favouries);

  return (
    <nav className='h-12 w-full border-b-2 border-white'>
      {favourites.length} added to favourites
    </nav>
  );
};

export default Navbar;
