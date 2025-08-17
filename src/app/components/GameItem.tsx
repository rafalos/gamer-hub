'use client';

import { useFavoriteStore } from '@/store/favorites.store.';
import { Game } from '@/types';
import React from 'react';

type Props = {
  game: Game;
};

const GameItem = ({ game }: Props) => {
  const { description, genre, id, platform, title } = game;

  const { favouries, toggle: toggleFavorite } = useFavoriteStore(
    (state) => state
  );

  const isFavorite = favouries.includes(id);

  return (
    <li
      onClick={() => toggleFavorite(id)}
      key={id}
      className={`ring-2 p-4 flex flex-col hover:bg-gray-700 hover:cursor-pointer ${
        isFavorite ? 'bg-gray-800' : ''
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
