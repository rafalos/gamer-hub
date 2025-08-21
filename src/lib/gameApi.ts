import { GamesResponse } from '@/types/api';
import axios from 'axios';
import redisClient from './redis';
import { Game } from '@/types';

type Resource = 'games';

const getResourceUrl = (resource: Resource) =>
  `https://api.rawg.io/api/${resource}?key=${process.env.RAWG_APIKEY!}`;

const GAMES_URL = getResourceUrl('games');

export const getByName = async (query: string): Promise<GamesResponse> => {
  const response = await fetch(`${GAMES_URL}&search=${query}`);
  const data = (await response.json()) as GamesResponse;

  return data;
};

export const getPopular = async () => {
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
