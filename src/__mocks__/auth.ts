import type { Session, User } from '@/types/db';

export const mockedSession = {
  session: {} as Session,
  user: {
    id: '123',
  } as User,
};
