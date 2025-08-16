import { mockGames } from '@/db/seed';

export async function GET() {
  return Response.json(mockGames);
}
