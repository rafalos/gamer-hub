import { getGameByRawgId } from '@/db/queries';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawg_id } = await params;

  const game = await getGameByRawgId(rawg_id);

  if (game) return Response.json(game);

  return Response.json(
    {
      message: 'Game with given ID was not found',
    },
    {
      status: 404,
    }
  );
}
