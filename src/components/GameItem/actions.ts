'use server';

import db from '@/db';
import { getGameByRawgId } from '@/db/queries';
import { gamesToUsers } from '@/db/schema';
import { auth } from '@/lib/auth';
import { fetchGame } from '@/lib/server/fetchers';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const addToLibrary = async (rawg_id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return;

  let game: Awaited<ReturnType<typeof getGameByRawgId>>;
  game = await getGameByRawgId(rawg_id);

  if (!game) game = await fetchGame(rawg_id);

  const result = await db
    .insert(gamesToUsers)
    .values({
      game_id: game.id,
      user_id: session.user.id,
    })
    .onConflictDoNothing();

  if (result.rowCount) {
    revalidatePath('home', 'layout');
    return true;
  }

  return false;
};
