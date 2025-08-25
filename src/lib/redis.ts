import Redis from 'redis';

const redisClient = Redis.createClient({
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

await redisClient.connect();

export default redisClient;
