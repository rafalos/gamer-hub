import { count, eq } from 'drizzle-orm';
import db from '.';
import { account, games, gamesToUsers, genres, user } from './schema';

export const checkUserEmail = async (
  email: string
): Promise<[boolean, boolean]> => {
  const foundUser = await db
    .select({
      passwordHash: account.password,
      email: user.email,
    })
    .from(user)
    .limit(1)
    .leftJoin(account, eq(account.userId, user.id))
    .where(eq(user.email, email));

  if (foundUser.length) {
    return [true, !!foundUser[0].passwordHash];
  }

  return [false, false];
};

export const getGenres = async () => {
  const foundGenres = await db.select().from(genres);

  return foundGenres;
};

export const getGameByRawgId = async (id: string) => {
  const foundGames = await db.select().from(games).where(eq(games.rawg_id, id));

  return foundGames[0];
};

export const getLibraryCountForUser = async (userId: string) => {
  const gamesCount = await db
    .select({
      count: count(),
    })
    .from(gamesToUsers)
    .where(eq(gamesToUsers.user_id, userId));

  return gamesCount[0].count;
};

export const getUserLibrary = async (userId: string) => {
  const libraryGames = await db
    .select()
    .from(games)
    .innerJoin(gamesToUsers, eq(games.id, gamesToUsers.game_id))
    .where(eq(gamesToUsers.user_id, userId));

  return libraryGames.map(({ games }) => games);
};
