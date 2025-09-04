import { count, eq, sql } from 'drizzle-orm';
import db from '.';
import {
  account,
  games,
  gamesToGenres,
  gamesToPlatforms,
  gamesToUsers,
  genres,
  platforms,
  user,
} from './schema';

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

  return foundGames.length ? foundGames[0] : null;
};

export const getGameWithDetailsByRawgId = async (id: string) => {
  const foundGame = await db
    .select({
      id: games.id,
      name: games.name,
      description: games.description,
      metacritic_score: games.metacritic_score,
      released: games.released,
      background_image: games.background_image,
      platforms: sql<string[]>`
        ARRAY(
          SELECT DISTINCT p.name
          FROM ${platforms} p
          JOIN ${gamesToPlatforms} gp ON gp.platform_id = p.id
          WHERE gp.game_id = ${games.rawg_id}
        )
      `,
      genres: sql<string[]>`
        ARRAY(
          SELECT DISTINCT g.name
          FROM ${genres} g
          JOIN ${gamesToGenres} gg ON gg.genre_id = g.id
          WHERE gg.game_id = ${games.rawg_id}
        )
      `,
    })
    .from(games)
    .where(eq(games.rawg_id, id))
    .limit(1);

  return foundGame[0];
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

export const getEmptyGames = async () => {
  const emptyGames = await db
    .select({
      rawg_id: games.rawg_id,
    })
    .from(games)
    .where(eq(games.name, ''));

  return emptyGames.map((record) => record.rawg_id);
};
