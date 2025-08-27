'use server';

import db from '@/db';
import { getGameByRawgId } from '@/db/queries';
import { games, gamesToUsers } from '@/db/schema';
import { auth } from '@/lib/auth';
import { gameQueue } from '@/lib/server/queue';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const addToLibrary = async (rawg_id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return;

  let gameId: number;
  gameId = (await getGameByRawgId(rawg_id))?.id;

  if (!gameId) {
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
  }

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
