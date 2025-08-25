import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import { genres, platforms } from '../src/db/schema';
import { fetchGenres, fetchPlatforms } from '../src/lib/server/fetchers';
import { sql } from 'drizzle-orm';

async function seed() {
  const db = drizzle(process.env.DB_CONNECTION_STRING!);
  const [result] = await db
    .select({
      genresExist: sql<boolean>`EXISTS(SELECT 1 FROM ${genres})`,
      platformsExist: sql<boolean>`EXISTS(SELECT 1 FROM ${platforms})`,
    })
    .from(genres);

  if (!result.genresExist || !result.platformsExist) {
    await Promise.all([fetchGenres(), fetchPlatforms()]);
    console.log('Database seeded.');
    process.exit(0);
  }
}

seed().catch(console.error);
