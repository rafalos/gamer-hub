import { ConnectionOptions, Queue } from 'bullmq';

export const connection: ConnectionOptions = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT!,
};

export const gameQueue = new Queue('rawg_game_queue', {
  connection,
});
