import { gameQueue } from '@/lib/server/queue';
import 'dotenv/config';

const UPDATE_LIST_URL = `${process.env.ROOT_URL}/api/gamesToUpdate`;

export const checkForGamesToUpdate = async () => {
  const response = await fetch(UPDATE_LIST_URL, {
    method: 'GET',
    headers: {
      Authorization: process.env.AUTHORIZATION!,
    },
  });

  if (!response.ok) {
    throw new Error('Unauthorized. Provide valid token in env file');
  }
  const data = await response.json();

  return data as string[];
};

export const createUpdateJobs = async () => {
  const gamesToUpdate = await checkForGamesToUpdate();

  if (gamesToUpdate.length === 0) return;

  const promiseArray = gamesToUpdate.map((rawg_id) =>
    gameQueue.add('fetch_game', {
      rawg_id,
    })
  );

  await Promise.all(promiseArray);
};
