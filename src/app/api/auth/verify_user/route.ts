import { checkUserEmail } from '@/db/queries';

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return Response.json(
      {
        message: 'Email address is missing in body',
      },
      {
        status: 400,
      }
    );
  }

  const [userExists, hashExists] = await checkUserEmail(email);

  if (!userExists) {
    return Response.json(
      {
        message: 'User was not found',
      },
      {
        status: 404,
      }
    );
  }

  if (!hashExists) {
    return Response.json(
      {
        message: 'It looks that account has previously signed in using GitHub. Please continue by signing in with GitHub again.',
      },
      {
        status: 403,
      }
    );
  }

  return new Response(null, {
    status: 200,
  });
}
