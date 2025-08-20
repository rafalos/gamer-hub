'use client';

import { useFavoriteStore } from '@/store/favorites.store.';
import { Game } from '@/types/api';
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

type Props = {
  game: Game;
};

const GameItem = ({ game }: Props) => {
  const { name, platforms, released, background_image, id } = game;

  const { favouries, toggle: toggleFavorite } = useFavoriteStore(
    (state) => state
  );

  const isFavorite = favouries.includes(id);

  return (
    <Card className='p-0 gap-0'>
      <CardHeader className='bg-slate-800 text-white p-2'>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent
        className='bg-cover bg-center w-2xl text-white h-[200px]'
        style={{ backgroundImage: `url(${game.background_image})` }}
      ></CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default GameItem;
