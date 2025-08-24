import { getById } from '@/lib/gameApi';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log(id);
  const game = await getById(id);


  console.log(game)
  return Response.json({
    status: 'ok',
  });
}
