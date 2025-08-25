import { getGameByRawgId } from '@/db/queries';
import { fetchGame } from '@/lib/server/fetchers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawg_id } = await params;

  const game = await getGameByRawgId(rawg_id);

  if (game) return Response.json(game);

  const result = await fetchGame(rawg_id);

  return Response.json(result);
}
