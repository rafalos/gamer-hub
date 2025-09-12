import db from '@/db';
import { getGameByRawgId } from '@/db/queries';
import { screenshots } from '@/db/schema';
import { getScreenshots } from '@/lib/server/rawg-api';

export const fetchScreenshots = async (rawg_id: string) => {
  const game = await getGameByRawgId(rawg_id);

  if (!game) throw new Error('Game was not found');

  const { id } = game;

  const rawgScreenshots = await getScreenshots(rawg_id);

  const screenshotsToInsert = rawgScreenshots.map(
    ({ height, image, width }) => ({
      url: image,
      width,
      height,
      game_id: id,
    })
  );

  await db.insert(screenshots).values(screenshotsToInsert);

  console.log(`${rawgScreenshots.length} inserted to DB`);
};
