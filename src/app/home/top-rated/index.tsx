import Box from '@/components/Box';
import GameItem from '@/components/GameItem';
import ItemGrid from '@/components/ItemGrid';
import { Game } from '@/types/api';
import axios from 'axios';
import React from 'react';

const TopRated = async () => {
  const popularGames = await axios.get<Game[]>(
    'http://localhost:3000/api/games/popular'
  );

  const games = popularGames.data.splice(1,6);
  return (
    <Box title='Top rated games'>
      <ItemGrid
        data={games}
        render={(game, index) => <GameItem game={game} key={index} />}
      />
    </Box>
  );
};

export default TopRated;
