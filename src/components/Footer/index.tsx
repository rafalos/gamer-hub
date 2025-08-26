import React from 'react';
import { Progress } from '../ui/progress';
import { getLibraryCountForUser } from '@/db/queries';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Count from './Count';

const Footer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const libraryCount = session
    ? await getLibraryCountForUser(session.user.id)
    : 0;

  return (
    <footer className='fixed bottom-0 lg:right-12 w-full lg:w-lg'>
      <div className='flex bg-white p-4 justify-center flex-col rounded-t-md'>
        <div className='flex items-center gap-2'>
          <Count initialCount={libraryCount} />
          <p className='text-md font-bold border-primary text-white bg-primary py-2 px-4 rounded-md'>
            14
          </p>
          <Progress value={50} className='h-6' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
