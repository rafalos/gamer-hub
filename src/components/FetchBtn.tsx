'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Game } from '@/types/api';
import React, { useState } from 'react';
import GameItem from './GameItem';

const FetchBtn = () => {
  const [query, setQuery] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    if (!query) return;

    const response = await fetch(
      `http://localhost:3000/api/games?query=${query}`
    );
    const games = (await response.json()) as Game[];

    setGames(games);
  };

  return (
    <div className='flex justify-center flex-col items-center'>
      <Input onChange={(event) => setQuery(event.target.value)} value={query} />
      <Button onClick={fetchGames}>Fetch</Button>
      <ul className='flex gap-4 flex-wrap items-center justify-center p-4'>
        {games.map((game) => (
          <GameItem game={game} key={game.id} />
        ))}
      </ul>{' '}
    </div>
  );
};

export default FetchBtn;
