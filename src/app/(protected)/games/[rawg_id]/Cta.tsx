import { Button } from '@/components/ui/button';
import { CheckCheckIcon, HeartIcon, PlusCircle } from 'lucide-react';
import React from 'react';

const Cta = () => {
  return (
    <div className='flex gap-2 w-full'>
      <Button
        className='cursor-pointer flex-1 border flex flex-col py-8'
        variant={'ghost'}
      >
        <p>like</p>
        <HeartIcon />
      </Button>
      <Button
        className='cursor-pointer flex-1 border flex flex-col py-8'
        variant={'ghost'}
      >
        <p>library</p>
        <PlusCircle />
      </Button>
      <Button
        className='cursor-pointer flex-1 border flex flex-col py-8'
        variant={'ghost'}
      >
        <p>completed</p>
        <CheckCheckIcon />
      </Button>
    </div>
  );
};

export default Cta;
