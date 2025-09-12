import { ConnectionOptions, Queue } from 'bullmq';

export const connection: ConnectionOptions = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT!,
};

export const gameQueue = new Queue<{ rawg_id: string }>('rawg_game_queue', {
  connection,
});

export const createUpdateGameJob = (rawg_id: string) =>
  gameQueue.add('fetch_game', {
    rawg_id,
  });

export const createFetchScreenshotsJob = (rawg_id: string) =>
  gameQueue.add('fetch_screenshots', {
    rawg_id,
  });
