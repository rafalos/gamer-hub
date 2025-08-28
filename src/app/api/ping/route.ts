import axios from 'axios';

export async function GET() {
  await axios.get(`${process.env.WORKER_URL}/keep-worker-alive`);

  return Response.json({ message: 'kept alive' });
}
