import { GamesResponse } from '@/types/api';
import axios from 'axios';
import redisClient from './redis';
import { Game } from '@/types/api';

type Resource = 'games' | 'platforms' | 'genres';
const PLATFORMS = ['2', '187', '1', '18', '186', '7', '14', '16', '15'];

export const getResourceUrl = (resource: Resource, id?: string) =>
  `https://api.rawg.io/api/${resource}${id ? `/${id}` : ''}?key=${process.env
    .RAWG_APIKEY!}`;

const GAMES_URL = getResourceUrl('games');
export const getGameByIdUrl = (id: string) => getResourceUrl('games', id);

export const getByName = async (query: string) => {
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
