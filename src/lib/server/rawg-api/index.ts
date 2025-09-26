import { GamesResponse } from '@/types/api';
import { getRedisClient } from '../redis';
import type { Game, ScreenshotsResponse } from '@/types/api';
import {
  GAMES_URL,
  PLATFORMS,
  getGameByIdUrl,
  getScreenshotsUrl,
} from './helpers';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import path from 'path';

const POPULAR_IDS_PATH = path.join(process.cwd(), 'data', 'popular.txt');

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

export const getPopular = async (platform?: string) => {
  const redisClient = await getRedisClient();
  const CACHE_KEY = `popular${platform ? `_${platform}` : ''}`;

  const cachedResults = await redisClient.get(CACHE_KEY);

  if (cachedResults) {
    return JSON.parse(cachedResults) as Game[];
  }

  const response = await axios.get<GamesResponse>(
    `${GAMES_URL}&ordering="rating"${
      platform ? `&platforms=${platform}&platforms_count=1` : ''
    }`
  );

  const games = response.data.results;

  const gameIDs = games.map((game) => game.id);

  await writeFile(POPULAR_IDS_PATH, gameIDs.join(','), 'utf-8');

  await redisClient.setEx(CACHE_KEY, 60 * 60, JSON.stringify(games));
  return games;
};

export const getById = async (id: string) => {
  const response = await axios.get<Game>(getGameByIdUrl(id));

  const game = response.data;

  return game;
};

export const getGamesCount = async () => {
  const redisClient = await getRedisClient();
  const CACHE_KEY = 'count';

  const cachedResults = await redisClient.get(CACHE_KEY);

  if (cachedResults) {
    return JSON.parse(cachedResults);
  }

  const response = await axios.get<GamesResponse>(GAMES_URL);

  const { count } = response.data;
  await redisClient.setEx(CACHE_KEY, 60 * 60, count.toString());
  return count;
};

export const getScreenshots = async (id: string) => {
  const url = getScreenshotsUrl(id);

  const response = await axios.get<ScreenshotsResponse>(url);

  return response.data.results;
};
