'use server';

import db from '@/db';
import { getGameByRawgId } from '@/db/queries';
import { games, gamesToUsers } from '@/db/schema';
import { auth } from '@/lib/auth';
import { gameQueue } from '@/lib/server/queue';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const addToLibraryAction = async (state: boolean, rawg_id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return false;

  let gameId: number;
  const game = await getGameByRawgId(rawg_id);
  
  if (!game) {
    const [{ id }] = await db
      .insert(games)
      .values({
        rawg_id,
        name: '',
      })
      .returning({
        id: games.id,
      });
    gameId = id;
  } else {
    gameId = game.id;
  }

  // wake up lazy worker in case of inactivity
  axios.get(`${process.env.WORKER_URL}/keep-worker-alive`);
  await gameQueue.add('fetch_game', {
    rawg_id,
  });

  const result = await db
    .insert(gamesToUsers)
    .values({
      game_id: gameId,
      user_id: session.user.id,
    })
    .onConflictDoNothing();

  if (result.rowCount) {
    revalidatePath('home', 'layout');
    return true;
  }

  return false;
};
