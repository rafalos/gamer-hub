import Cta from '@/app/(protected)/games/[rawg_id]/Cta';
import Processor from '@/app/(protected)/games/[rawg_id]/Processor';
import Screenshots from '@/app/(protected)/games/[rawg_id]/Screenshots';
import { getGameWithDetailsByRawgId, getScreenshotsOfGame } from '@/db/queries';
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

    return <Processor rawg_id={rawg_id} />;
  }

  const screenshots = await getScreenshotsOfGame(game.id);

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
    <div className='flex gap-8 relative h-full flex-col md:flex-row'>
      <div className='flex flex-col static md:sticky top-24 h-full items-center md:items-start flex-1'>
        <div className='w-full p-2 rounded-t-md border'>
          <h1 className='text-lg'>{name}</h1>
        </div>
        <div className='w-full h-48 relative'>
          <Image
            src={background_image ?? '/placeholder.svg'}
            fill
            alt={game.name}
            className='object-cover'
            blurDataURL='/placeholder.svg'
          />
        </div>
        <Cta />
      </div>
      <div className='flex flex-col gap-4 flex-3'>
        <div>
          <h2 className='font-bold'>Release date:</h2>
          <p> {released}</p>
        </div>

        {metacritic_score && (
          <div>
            <h2 className='font-bold'>Metacritic score:</h2>
            <span className='bg-metacritic text-white p-1 text-lg'>
              {metacritic_score}
            </span>
          </div>
        )}
        <div>
          <h2 className='font-bold'>Genres:</h2>
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
        <div>
          <h2 className='font-bold'>Platforms:</h2>
          <ul className='flex gap-2'>
            {platforms.map((platform) => (
              <li key={platform}>{platform}</li>
            ))}
          </ul>
        </div>

        {description && (
          <div className='min-w-0'>
            <h2 className='font-bold'>Description:</h2>
            <div
              className='text-justify'
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          </div>
        )}

        {screenshots.length && (
          <Screenshots images={screenshots} gameName={game.name} />
        )}
      </div>
    </div>
  );
};

export default Game;
