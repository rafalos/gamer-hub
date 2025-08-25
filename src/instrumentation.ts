export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { sql } = await import('drizzle-orm');
    const { default: db } = await import('./db');
    const { genres, platforms } = await import('./db/schema');
    const { fetchGenres, fetchPlatforms } = await import(
      './lib/server/fetchers'
    );

    const result = await db
      .select({
        genresExist: sql<boolean>`EXISTS(SELECT 1 FROM ${genres})`,
        platformsExist: sql<boolean>`EXISTS(SELECT 1 FROM ${platforms})`,
      })
      .from(genres)
      .limit(1);

    if (!result[0].genresExist || !result[0].platformsExist) {
      await Promise.all([fetchGenres(), fetchPlatforms()]);

      console.log(`Database seeded with necessary data`);
    }
  }
}
