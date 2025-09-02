import { NextRequest, NextResponse } from 'next/server';
import { getEmptyGames } from '@/db/queries';

export async function GET(request: NextRequest) {
  const authToken = request.headers.get('Authorization');

  if (!authToken || authToken !== process.env.AUTHORIZATION) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const gamesToUpdate = await getEmptyGames();

  return NextResponse.json(gamesToUpdate);
}
