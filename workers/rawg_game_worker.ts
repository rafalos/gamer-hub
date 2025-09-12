import 'dotenv/config';

import { Worker } from 'bullmq';
import { connection } from '@/lib/server/queue';
import express from 'express';
import cron from 'node-cron';
import { createUpdateJobs } from './helpers';
import { handleJob } from './jobHandler';
import { Game } from '@/types/db';

const app = express();

cron.schedule('0 */10 * * *', async () => {
  try {
    await createUpdateJobs();
  } catch (error) {
    console.log(error);
  }
});

export type JobName = 'fetch_game' | 'fetch_screenshots';

const worker = new Worker<
  {
    rawg_id: string;
  },
  Game | void,
  JobName
>(
  'rawg_game_queue',
  async (job) => {
    try {
      await handleJob(job);
    } catch (error) {
      console.log(error);
      console.log('failed to process job');
    }
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
  console.log(`[${new Date().toISOString()}] Worker kept alive`);
  res.send('kept alive');
});

app.listen(process.env.WORKER_PORT, () => {
  console.log(`Listetning`);
});
