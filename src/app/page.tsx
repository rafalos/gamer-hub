import React from 'react';
import { Game } from '@/types';
import Navbar from './components/Navbar';
import GameItem from './components/GameItem';

const Page = async () => {
  const request = await fetch('http://localhost:3000/api/games');
  const games: Game[] = await request.json();

  return (
    <div className='h-dvh'>
      <Navbar />
      <ul className='flex gap-4 flex-wrap items-center p-4'>
        {games.map((game) => (
          <GameItem game={game} key={game.id} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
