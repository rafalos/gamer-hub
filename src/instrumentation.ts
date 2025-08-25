import { sql } from 'drizzle-orm';
import db from './db';
import { genres, platforms } from './db/schema';
import { fetchGenres, fetchPlatforms } from './lib/fetchers';

export async function register() {
  const [result] = await db
    .select({
      genresExist: sql<boolean>`EXISTS(SELECT 1 FROM ${genres})`,
      platformsExist: sql<boolean>`EXISTS(SELECT 1 FROM ${platforms})`,
    })
    .from(genres)
    .limit(1);

  if (!result.genresExist || !result.platformsExist) {
    await Promise.all([fetchGenres, fetchPlatforms]);

    console.log(`Database seeded with necessary data`);
  }
}
