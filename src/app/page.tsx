import React from 'react';
import { Game } from '@/types';
import Navbar from './components/Navbar';
import GameItem from './components/GameItem';
import FetchBtn from './components/FetchBtn';
import { Button } from '@/components/ui/button';
import { LucideGamepad2 } from 'lucide-react';
import { LucideGamepad } from 'lucide-react';
import Hero from './components/Hero';

const Page = async () => {
  return (
    <div className='h-dvh'>
      {/* <Navbar /> */}
      {/* <FetchBtn /> */}
      <main className='flex flex-col justify-center items-center h-full gap-4'>
        <Hero />
      </main>
    </div>
  );
};

export default Page;
