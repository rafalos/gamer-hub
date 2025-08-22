import React from 'react';
import Heading from '../Heading';
import Actions from './Actions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Search from './Search';

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('There was an unexpected error');

  return (
    <nav className='p-2 mx-auto h-32 lg:h-24 mb-4 sticky top-0 z-999 bg-white'>
      <div className='flex-col lg:flex-row max-w-[1440px] flex justify-between gap-4 lg:gap-12 items-center mx-auto h-full'>
        <Heading isBrand />
        <Search />
        <Actions name={session.user.name} />
      </div>
    </nav>
  );
};

export default Navbar;
