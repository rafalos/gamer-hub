import Redis from 'redis';

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (error) =>
  console.error('Error connecting to the redis service', error)
);

await redisClient.connect();


await redisClient.ping()
const keys = await redisClient.keys("*")
console.log(keys)
export default redisClient;
