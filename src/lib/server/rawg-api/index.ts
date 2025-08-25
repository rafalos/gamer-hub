'use server';

import { GamesResponse } from '@/types/api';
import axios from 'axios';
import { getRedisClient } from '../redis';
import { Game } from '@/types/api';
import { GAMES_URL, PLATFORMS, getGameByIdUrl } from './helpers';

export const getByName = async (query: string) => {
  const redisClient = await getRedisClient();

  const CACHE_KEY = `search_${query}`;

  const cachedResults = await redisClient.get(CACHE_KEY);

  if (cachedResults) {
    return JSON.parse(cachedResults) as Game[];
  }

  const response = await axios.get<GamesResponse>(
    `${GAMES_URL}&search=${query}&platforms=${PLATFORMS.join(
      ','
    )}&search_precise=true`
  );

  const games = response.data.results.filter((game) => game.ratings_count > 30);
  await redisClient.setEx(CACHE_KEY, 60 * 60, JSON.stringify(games));
  return games;
};

export const getPopular = async () => {
  const redisClient = await getRedisClient();
  const CACHE_KEY = 'popular';

  const cachedResults = await redisClient.get(CACHE_KEY);

  if (cachedResults) {
    return JSON.parse(cachedResults) as Game[];
  }

  const response = await axios.get<GamesResponse>(
    `${GAMES_URL}&ordering="rating"`
  );

  const games = response.data.results;
  await redisClient.setEx(CACHE_KEY, 60 * 60, JSON.stringify(games));
  return games;
};

export const getById = async (id: string) => {
  const response = await axios.get<Game>(getGameByIdUrl(id));

  const game = response.data;

  return game;
};
