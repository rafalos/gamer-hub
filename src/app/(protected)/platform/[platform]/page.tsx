import GameItem from '@/components/GameItem';
import ItemGrid from '@/components/ItemGrid';
import { Game } from '@/types/api';
import axios from '@/lib/axios';
import Box from '@/components/Box';
import React from 'react';

const platformsMap: Record<string, string[]> = {
  playstation: ['187', '18', '16', '15'],
  xbox: ['1', '186'],
  pc: ['4'],
  nintendo: ['7'],
};

const Platform = async ({
  params,
}: {
  params: Promise<{ platform: string }>;
}) => {
  const { platform } = await params;

  const popularGames = await axios.get<Game[]>(
    `/api/games/popular?platform=${platformsMap[platform].join(',')}`
  );

  const games = popularGames.data.splice(1, 12);

  return (
    <Box title={`Top rated ${platform} games`}>
      <ItemGrid
        data={games}
        render={(game, index, library, wishlist) => {
          const isInLibrary = library.some(
            (libGame) => libGame.rawg_id === game.id.toString()
          );

          const isWishlisted = wishlist.some(
            (wishlistGame) => wishlistGame.rawg_id === game.id.toString()
          );

          return (
            <GameItem
              game={game}
              key={index}
              isInLibrary={isInLibrary}
              isWishlisted={isWishlisted}
            />
          );
        }}
      />
    </Box>
  );
};

export default Platform;
