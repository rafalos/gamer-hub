import Image from 'next/image';
import { Game } from '@/types/api';
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Actions from './Actions';

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
    <Card className='p-0 gap-0 w-full hover:cursor-pointer transition-transform justify-between'>
      <CardHeader className='grid-cols-[repeat(auto-fit,minmax(0,30px))] justify-items-center text-accent p-2 text-center'>
        {uniquePlatforms.map((platform) => (
          <div
            key={platform}
            className={`${platformColors[platform]} 0 w-full flex justify-center rounded-md`}
          >
            <Image
              className='m-1'
              alt={`${platform} logo`}
              src={`/icons/platforms/${platform.toLowerCase()}.svg`}
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
          src={`${background_image ?? '/placeholder.svg'}`}
          alt={name}
          fill
          placeholder='blur'
          blurDataURL='/placeholder.svg'
        />
      </CardContent>
      <CardFooter className='flex items-center justify-center flex-col text-black p-4 text-sm font-bold'>
        {name}
      </CardFooter>
      <Actions id={id}/>
    </Card>
  );
};

export default GameItem;
