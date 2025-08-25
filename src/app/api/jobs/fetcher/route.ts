import { fetchGenres, fetchPlatforms } from '@/lib/server/fetchers';

export async function GET() {
  await fetchGenres();
  await fetchPlatforms()

  console.log('Job finished');

  return Response.json({ ok: true });
}
