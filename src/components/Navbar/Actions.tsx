'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { LogOutIcon } from 'lucide-react';

type Props = {
  name: string;
};

const Actions = ({ name }: Props) => {
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
    <div className='hidden lg:flex justify-center items-center gap-4'>
      <p>Welcome, {name}</p>
      <Button onClick={signOut} variant='ghost' className='cursor-pointer'>
        <LogOutIcon />
      </Button>
    </div>
  );
};

export default Actions;
