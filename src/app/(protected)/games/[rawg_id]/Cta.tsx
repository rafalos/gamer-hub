import { Button } from '@/components/ui/button';
import { CheckCheckIcon, HeartIcon, LibraryIcon } from 'lucide-react';
import React from 'react';

const Cta = () => {
  return (
    <div className='flex gap-2'>
      <Button className='cursor-pointer'>
        <HeartIcon fill='#FFFFFF' />i want this game
      </Button>
      <Button className='cursor-pointer'><LibraryIcon  /> I have this game</Button>
      <Button className='cursor-pointer'><CheckCheckIcon /> I have completed this game</Button>
    </div>
  );
};

export default Cta;
