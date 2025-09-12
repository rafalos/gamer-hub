import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export const getRedisClient = async () => {
  if (redisClient) return redisClient;

  redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT!,
    },
  });

  await redisClient.connect();

  redisClient.on('error', (error) =>
    console.error('Error connecting to the redis service', error)
  );

  return redisClient;
};
