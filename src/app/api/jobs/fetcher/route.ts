import { fetchGenres } from '@/lib/fetchers';

export async function GET() {
  await fetchGenres();

  console.log('Job finished');

  return Response.json({ ok: true });
}
