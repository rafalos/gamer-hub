import React from 'react';
import Heading from '../Heading';
import Actions from './Actions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('There was an unexpected error');

  return (
    <nav className='p-2 mx-auto'>
      <div className='h-16 max-w-[1440px] flex justify-between items-center mx-auto'>
        <Heading isBrand />
        <Actions name={session.user.name} />
      </div>
    </nav>
  );
};

export default Navbar;
