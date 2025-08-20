'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  return (
    <nav className='h-12 w-full flex justify-between items-center p-4'>
      <div className='text-2xl font-bold'>GamerHub</div>
      <div>
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    </nav>
  );
};

export default Navbar;
