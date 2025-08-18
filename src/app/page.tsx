import React from 'react';
import { Game } from '@/types';
import Navbar from './components/Navbar';
import GameItem from './components/GameItem';
import FetchBtn from './components/FetchBtn';

const Page = async () => {
  return (
    <div className='h-dvh'>
      <Navbar />
      <FetchBtn />
    </div>
  );
};

export default Page;
