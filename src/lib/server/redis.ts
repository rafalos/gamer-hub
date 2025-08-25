import { RedisClientType, createClient } from 'redis';

let redisClient: RedisClientType | null = null;

export const getRedisClient = async () => {
  redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT!,
    },
  });

  redisClient.on('error', (error) =>
    console.error('Error connecting to the redis service', error)
  );

  return redisClient;
};

export default redisClient;
