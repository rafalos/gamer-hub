import { fetchGame } from '@/lib/server/fetchers';
import { fetchScreenshots } from '@/lib/server/fetchers/screenshots';
import { Game } from '@/types/db';
import { JobName } from 'workers/rawg_game_worker';

export type GameJob<T extends JobName> = {
  name: T;
  data: {
    rawg_id: string;
  };
};

type JobReturn<T extends JobName> = T extends 'fetch_game'
  ? Promise<Game>
  : Promise<void>;

export const handleJob = async <T extends JobName>({
  data,
  name,
}: GameJob<T>) => {
  console.log(`Handling game job ${name}`);
  const { rawg_id } = data;

  switch (name) {
    case 'fetch_game':
      return fetchGame(rawg_id) as JobReturn<T>;
    case 'fetch_screenshots':
      return fetchScreenshots(rawg_id) as JobReturn<T>;
    default:
      throw new Error('Incorrect job');
  }
};
