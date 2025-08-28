import { getById } from '@/lib/server/rawg-api';
import db from '@/db';
import { games, gamesToGenres, gamesToPlatforms } from '@/db/schema';
import axios from 'axios';

export const fetchGame = async (rawg_id: string) => {
  const {
    name,
    description,
    metacritic,
    released,
    background_image,
    platforms,
    genres,
  } = await getById(rawg_id);

  const gamesToPlatformsInsert = platforms.map(({ platform }) => ({
    game_id: rawg_id,
    platform_id: platform.id.toString(),
  }));

  const gamesToGenresInsert = genres.map(({ id: genreId }) => ({
    game_id: rawg_id,
    genre_id: genreId.toString(),
  }));

  const result = await db.transaction(async (tx) => {
    const [game] = await tx
      .insert(games)
      .values({
        rawg_id,
        name,
        description,
        metacritic_score: metacritic,
        released,
        background_image,
      })
      .onConflictDoUpdate({
        target: games.rawg_id,
        set: {
          name,
          description,
          metacritic_score: metacritic,
          released,
          background_image,
        },
      })
      .returning();

    await tx
      .insert(gamesToPlatforms)
      .values(gamesToPlatformsInsert)
      .onConflictDoNothing();

    await tx
      .insert(gamesToGenres)
      .values(gamesToGenresInsert)
      .onConflictDoNothing();

    return game;
  });

  console.log(`${rawg_id} inserted to DB`);
  return result;
};
