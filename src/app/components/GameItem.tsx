'use client';
import { useFavouriteStore } from '@/store';
import { Game } from '@/types';
import React from 'react';

type Props = {
  game: Game;
};

const GameItem = ({ game }: Props) => {
  const { description, genre, id, platform, title } = game;

  const { favouries, toggle: toggleFavourite } = useFavouriteStore(
    (state) => state
  );

  const isFavourite = favouries.includes(id);

  return (
    <li
      onClick={() => toggleFavourite(id)}
      key={id}
      className={`ring-2 p-4 flex flex-col hover:bg-gray-700 hover:cursor-pointer ${
        isFavourite ? 'bg-gray-800' : ''
      }`}
    >
      <p>{title}</p>
      <p>{genre}</p>
      <p>{platform}</p>
      <p>{description}</p>
    </li>
  );
};

export default GameItem;
