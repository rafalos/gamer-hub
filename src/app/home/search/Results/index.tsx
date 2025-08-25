import GameItem from '@/components/GameItem';
import ItemGrid from '@/components/ItemGrid';
import Box from '@/components/Box';
import React from 'react';
import { Game } from '@/types/api';
// import { getByName } from '@/lib/server/rawg-api';

type Props = {
  query: string;
};

const Results = async ({ query }: Props) => {
  const games = [] as Game[]

  return (
    <Box title={`Search results for query ${query}`}>
      <ItemGrid
        data={games}
        render={(game, index) => <GameItem game={game} key={index} />}
      />
    </Box>
  );
};

export default Results;
