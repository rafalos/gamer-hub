import GameItem from '@/components/GameItem';
import ItemGrid from '@/components/ItemGrid';
import Box from '@/components/Box';
import React from 'react';
import { getByName } from '@/lib/server/rawg-api';

type Props = {
  query: string;
};

const Results = async ({ query }: Props) => {
  const games = await getByName(query);

  return (
    <Box title={`Search results for query ${query}`}>
      <ItemGrid
        data={games}
        render={(game, index, library) => {
          const isInLibrary = library.some(
            (libGame) => libGame.rawg_id === game.id.toString()
          );

          return <GameItem game={game} key={index} isInLibrary={isInLibrary} />;
        }}
      />
    </Box>
  );
};

export default Results;
