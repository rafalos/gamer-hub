import { getByName } from '@/lib/gameApi';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query');

  if (!query) {
    return new Response('Query parameter is required', {
      status: 500,
    });
  }

  const games = await getByName(query);

  const { results } = games;

  console.log(`fetched ${results.length} games`);

  return Response.json(results);
}
