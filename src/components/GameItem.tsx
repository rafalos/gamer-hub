import Image from 'next/image';
import { Game } from '@/types/api';
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

type Props = {
  game: Game;
};

const platformColors: Record<string, string> = {
  xbox: 'bg-xbox',
  playstation: 'bg-playstation',
  pc: 'bg-pc',
  nintendo: 'bg-nintendo',
};

const GameItem = ({ game }: Props) => {
  const { name, platforms, background_image, id } = game;

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
    <Card className='p-0 gap-0 w-full bg-[#2B2D42] hover:scale-105 hover:cursor-pointer transition-transform'>
      <CardHeader className='grid-cols-[repeat(auto-fit,minmax(0,1fr))] justify-items-center text-accent p-2 text-center'>
        {uniquePlatforms.map((platform) => (
          <div
            key={platform}
            className={`${platformColors[platform]} 0 w-full flex justify-center rounded-md`}
          >
            <Image
              alt={`${platform} logo`}
              src={`icons/platforms/${platform.toLowerCase()}.svg`}
              width={20}
              height={20}
            />
          </div>
        ))}
      </CardHeader>
      <CardContent className='relative h-[150px] group'>
        <Image
          sizes='400px'
          className='object-cover'
          src={`${background_image}` || '/placeholder.svg'}
          alt={name}
          fill
          placeholder='blur'
          blurDataURL='/placeholder.svg'
        />
        <div className='absolute w-full h-full bg-black/70 left-0 top-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <p className='text-accent font-bold'>Add to library</p>
        </div>
      </CardContent>
      <CardFooter className='text-accent h-12 flex items-center justify-center p-4 text-sm font-bold'>
        {name}
      </CardFooter>
    </Card>
  );
};

export default GameItem;
