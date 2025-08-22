import Redis from 'redis';

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (error) =>
  console.error('Error connecting to the redis service', error)
);

await redisClient.connect();

export default redisClient;
