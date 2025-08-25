import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import { genres, platforms } from '../src/db/schema';
import { fetchGenres, fetchPlatforms } from '../src/lib/server/fetchers';
import { sql } from 'drizzle-orm';

async function seed() {
  const db = drizzle(process.env.DB_CONNECTION_STRING!);
  const { rows } = await db.execute<{
    genresExist: boolean;
    platformsExist: boolean;
  }>(
    sql`SELECT EXISTS(SELECT 1 FROM ${genres}) AS "genresExist", EXISTS(SELECT 1 FROM ${platforms}) AS "platformsExist"`
  );

  const result = rows[0];
  if (!result.genresExist || !result.platformsExist) {
    await Promise.all([fetchGenres(), fetchPlatforms()]);
    console.log('Database seeded.');
  }
  process.exit(0);
}

seed().catch(console.error);
