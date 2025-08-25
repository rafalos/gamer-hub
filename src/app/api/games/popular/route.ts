import { getPopular } from '@/lib/server/rawg-api';

export async function GET() {
  const games = await getPopular();

  console.log(`fetched ${games.length} games`);

  return Response.json(games);
}
