import { eq } from 'drizzle-orm';
import db from '.';
import { account, user } from './schema';

export const checkUserEmail = async (
  email: string
): Promise<[boolean, boolean]> => {
  const foundUser = await db
    .select({
      passwordHash: account.password,
      email: user.email,
    })
    .from(user)
    .limit(1)
    .leftJoin(account, eq(account.userId, user.id))
    .where(eq(user.email, email));

  if (foundUser.length) {
    return [true, !!foundUser[0].passwordHash];
  }

  return [false, false];
};
