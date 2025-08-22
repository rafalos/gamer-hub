import GameItem from '@/components/GameItem';
import ItemGrid from '@/components/ItemGrid';
import Box from '@/components/Box';
import React from 'react';
import { getByName } from '@/lib/gameApi';

type Props = {
  query: string;
};

const Results = async ({ query }: Props) => {
  const games = await getByName(query);

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
