import { Button } from '@/components/ui/button';
import { CheckCheckIcon, HeartIcon, LibraryIcon } from 'lucide-react';
import React from 'react';

const Cta = () => {
  return (
    <div className='flex gap-2'>
      <Button className='cursor-pointer'>
        <HeartIcon fill='#FFFFFF' />
      </Button>
      <Button className='cursor-pointer'>
        <LibraryIcon />
      </Button>
      <Button className='cursor-pointer'>
        <CheckCheckIcon />
      </Button>
    </div>
  );
};

export default Cta;
