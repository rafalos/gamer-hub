import { mockedSession } from '__mocks__/auth';
import { mockDbGame } from '__mocks__/game';
import { addToLibraryAction } from '@/components/GameItem/actions';
import { getGameByRawgId } from '@/db/queries';
import { auth } from '@/lib/auth';
import { gameQueue } from '@/lib/server/queue';
import { revalidatePath } from 'next/cache';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const INITIAL_STATE = false;
const TEST_RAWG_ID = mockDbGame.rawg_id;

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

const valuesMock = vi.fn().mockReturnThis();
const returningMock = vi.fn().mockResolvedValue([
  {
    id: 1,
  },
]);
const conflictMock = vi.fn().mockResolvedValue({
  rowCount: 1,
});

vi.mock('@/db', () => ({
  default: {
    insert: vi.fn(() => ({
      values: valuesMock,
      returning: returningMock,
      onConflictDoNothing: conflictMock,
    })),
  },
}));

vi.mock('@/lib/server/queue', () => ({
  gameQueue: {
    add: vi.fn(),
  },
}));

vi.mock('axios');

vi.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(() => mockedSession),
    },
  },
}));

vi.mock('next/headers');

vi.mock('@/db/queries', () => ({
  getGameByRawgId: vi.fn(() => mockDbGame),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('addToLibraryAction', () => {
  test('returns false if user is not logged in', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValueOnce(null);
    const result = await addToLibraryAction(INITIAL_STATE, TEST_RAWG_ID);

    expect(result).toBeFalsy();
  });

  test('fetches game from db succesfully', async () => {
    await addToLibraryAction(INITIAL_STATE, TEST_RAWG_ID);

    expect(getGameByRawgId).toBeCalledWith(TEST_RAWG_ID);
  });

  test('adds new job to worker queue', async () => {
    await addToLibraryAction(INITIAL_STATE, TEST_RAWG_ID);

    expect(gameQueue.add).toHaveBeenCalledWith(
      'fetch_game',
      expect.objectContaining({
        rawg_id: TEST_RAWG_ID,
      })
    );
  });

  test('inserts empty game to db if game does not exists in db', async () => {
    vi.mocked(getGameByRawgId).mockResolvedValueOnce(null);

    await addToLibraryAction(INITIAL_STATE, TEST_RAWG_ID);

    expect(valuesMock).toHaveBeenCalled();

    expect(valuesMock.mock.calls[0][0]).toMatchObject({
      rawg_id: TEST_RAWG_ID,
      name: '',
    });
  });

  test('adds game to users library succesfully', async () => {
    await addToLibraryAction(INITIAL_STATE, TEST_RAWG_ID);

    expect(valuesMock).toHaveBeenCalled();
    expect(valuesMock.mock.calls[0][0]).toMatchObject({
      game_id: mockDbGame.id,
      user_id: mockedSession.user.id,
    });
    expect(revalidatePath).toBeCalled();
  });

  test('returns false when game already exists in library', async () => {
    conflictMock.mockResolvedValueOnce({
      rowCount: 0,
    });

    const result = await addToLibraryAction(INITIAL_STATE, TEST_RAWG_ID);

    expect(result).toBeFalsy();
    expect(revalidatePath).not.toBeCalled();
  });
});
