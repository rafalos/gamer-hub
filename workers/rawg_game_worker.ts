import 'dotenv/config';

import { Worker } from 'bullmq';
import { connection } from '@/lib/server/queue';
import { fetchGame } from '@/lib/server/fetchers';

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
