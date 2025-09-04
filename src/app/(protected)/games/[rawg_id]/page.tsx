import Cta from '@/app/(protected)/games/[rawg_id]/Cta';
import Processor from '@/app/(protected)/games/[rawg_id]/Processor';
import { getGameWithDetailsByRawgId } from '@/db/queries';
import { fetchGame } from '@/lib/server/fetchers';
import Image from 'next/image';
import React from 'react';

const Game = async ({
  params,
}: {
  params: Promise<{
    rawg_id: string;
  }>;
}) => {
  const { rawg_id } = await params;

  const game = await getGameWithDetailsByRawgId(rawg_id);

  if (!game || !game.name) {
    await fetchGame(rawg_id);

    return <Processor />;
  }

  const {
    description,
    name,
    background_image,
    genres,
    platforms,
    metacritic_score,
    released,
  } = game;
  return (
    <div className='flex gap-4'>
      <div className='w-64 h-64 relative flex-1 flex flex-col'>
        <Image
          src={background_image ?? '/placeholder.svg'}
          fill
          alt={game.name}
          className='object-cover'
        />
        <ul className='flex gap-2'>
          {genres.map((genre) => (
            <li
              className='bg-white border b h-8 p-1 px-4 rounded-md hover:bg-accent hover:cursor-pointer'
              key={genre}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col flex-4 gap-2'>
        <div className='flex gap-2'>
          {metacritic_score && <div className='flex items-center justify-center bg-metacritic text-white px-6 text-3xl'>
            {metacritic_score}
          </div>}
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'>{name}</h1>
            <p>Release date: {released}</p>
            <ul className='flex gap-2'>
              {platforms.map((platform) => (
                <li key={platform}>{platform}</li>
              ))}
            </ul>
          </div>
        </div>
        <Cta />
        {description && (
          <div
            className='text-justify'
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Game;
