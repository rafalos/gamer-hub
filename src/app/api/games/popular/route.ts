import { getPopular } from '@/lib/server/rawg-api';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const platform = searchParams.get('platform');

  const games = await getPopular(platform ?? '');

  console.log(`fetched ${games.length} games`);

  return Response.json(games);
}
