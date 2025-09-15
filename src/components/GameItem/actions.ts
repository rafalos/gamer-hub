'use server';

import db from '@/db';
import { getGameByRawgId } from '@/db/queries';
import { games, gamesToUsers, wishlistedGames } from '@/db/schema';
import { auth } from '@/lib/auth';
import { gameQueue } from '@/lib/server/queue';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

type ActionType = 'library' | 'wishlist';

type Payload = {
  rawg_id: string;
  actionType: ActionType;
};

export const ctaAction = async (state: boolean, payload: Payload) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return false;

  const { actionType, rawg_id } = payload;
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

  const table = actionType === 'library' ? gamesToUsers : wishlistedGames;
  const idToInsert = actionType === 'library' ? gameId : rawg_id

  const result = await db
    .insert(table)
    .values({
      game_id: idToInsert,
      user_id: session.user.id,
    })
    .onConflictDoNothing();

  if (result.rowCount) {
    revalidatePath('home', 'layout');
    return true;
  }

  return false;
};
