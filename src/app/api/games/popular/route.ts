import { getPopular } from '@/lib/gameApi';

export async function GET() {
  const games = await getPopular();

  console.log(`fetched ${games.length} games`);

  return Response.json(games);
}
