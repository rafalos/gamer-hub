import Image from 'next/image';
import { Game } from '@/types/api';
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Cta from './Cta';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  game: Game;
  isInLibrary: boolean;
  isWishlisted: boolean;
};

const platformColors: Record<string, string> = {
  xbox: 'bg-xbox',
  playstation: 'bg-playstation',
  pc: 'bg-pc',
  nintendo: 'bg-nintendo',
};

const GameItem = ({ game, isInLibrary, isWishlisted }: Props) => {
  const { name, platforms, background_image, id, metacritic } = game;

  const availablePlatforms = platforms.map(({ platform }) =>
    platform.name.split(' ')[0].toLowerCase()
  );

  const uniquePlatforms = [...new Set(availablePlatforms)].filter(
    (platform) =>
      platform == 'playstation' ||
      platform == 'xbox' ||
      platform == 'nintendo' ||
      platform == 'pc'
  );

  return (
    <Card className='p-0 gap-0 w-full hover:cursor-pointer transition-transform justify-between rounded-none'>
      <CardHeader className='grid-cols-[repeat(auto-fit,minmax(0,30px))] justify-items-center text-accent p-2 text-center relative'>
        {uniquePlatforms.map((platform) => (
          <Link
            href={`/platform/${platform}`}
            key={platform}
            className={`${platformColors[platform]} w-full flex justify-center rounded-md`}
          >
            <Image
              className='m-1'
              alt={`${platform} logo`}
              src={`/icons/platforms/${platform.toLowerCase()}.svg`}
              width={20}
              height={20}
            />
          </Link>
        ))}
        {metacritic && (
          <Tooltip>
            <TooltipTrigger className='absolute right-1 top-1.5 bg-metacritic rounded-full py-1 px-2 font-bold cursor-pointer'>
              {metacritic}
            </TooltipTrigger>
            <TooltipContent>
              <p>Metacritic score</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardHeader>
      <Link href={`/games/${id}`}>
        <CardContent className='relative h-[150px] group'>
          <Image
            sizes='400px'
            className='object-cover'
            src={`${background_image ?? '/placeholder.svg'}`}
            alt={name}
            fill
            placeholder='blur'
            blurDataURL='/placeholder.svg'
          />
        </CardContent>
        <CardFooter className='flex items-center justify-center flex-col text-black p-4 h-16 text-sm font-bold'>
          {name}
        </CardFooter>
      </Link>
      <Cta id={id} isInLibrary={isInLibrary} isWishlisted={isWishlisted} />
    </Card>
  );
};

export default GameItem;
