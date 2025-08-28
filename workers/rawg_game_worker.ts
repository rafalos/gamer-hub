import 'dotenv/config';

import { Worker } from 'bullmq';
import { connection } from '@/lib/server/queue';
import { fetchGame } from '@/lib/server/fetchers';
import express from 'express';

const app = express();

const worker = new Worker(
  'rawg_game_queue',
  async (job) => {
    const { rawg_id } = job.data;

    await fetchGame(rawg_id);
  },
  {
    connection,
  }
);

worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});

app.get('/keep-worker-alive', (req, res) => {
  res.send('kept alive');
});

app.listen(process.env.WORKER_PORT, () => {
  console.log(`Listetning`);
});
