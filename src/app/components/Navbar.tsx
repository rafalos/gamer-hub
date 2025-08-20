'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='h-12 w-full flex justify-between items-center p-4'>
      <div className='text-2xl font-bold'>GamerHub</div>
      <div>
        <Button>Sign in</Button>
      </div>
    </nav>
  );
};

export default Navbar;
