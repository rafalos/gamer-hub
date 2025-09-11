import Processor from '@/app/(protected)/games/[rawg_id]/Processor';
import { getGameByRawgId } from '@/lib/api';
import { render, screen, act } from '@testing-library/react';
import { mockDbGame, mockDbGameWithoutName } from '__mocks__/game';
import { refreshMock } from '__mocks__/next/navigation';
import { afterEach } from 'node:test';
import { test, describe, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/api', () => ({
  getGameByRawgId: vi.fn(() => Promise.resolve()),
}));

vi.mock('next/navigation');

const RAWG_ID = '123';
const RETRIES_COUNT = 5;

describe('<Processor />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('tries to fetch game details', async () => {
    render(<Processor rawg_id={RAWG_ID} />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(getGameByRawgId).toHaveBeenCalled();
  });

  test('Renders proper message when game details are being fetched', () => {
    render(<Processor rawg_id={RAWG_ID} />);

    const fetchingText = screen.getByText(
      /game details are currently being processed/i
    );

    expect(fetchingText).toBeInTheDocument();
  });

  test('retries 5 times and shows timeout message if game not fetched', async () => {
    vi.mocked(getGameByRawgId).mockResolvedValue(mockDbGameWithoutName);

    render(<Processor rawg_id={RAWG_ID} />);

    for (let index = 0; index < RETRIES_COUNT; index++) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
        await Promise.resolve();
      });
    }

    const timeoutText = screen.getByText(
      /fetching game details is taking more time than expected/i
    );

    expect(timeoutText).toBeInTheDocument();
  });

  test('refreshes site when data is fetched succesfully', async () => {
    vi.mocked(getGameByRawgId).mockResolvedValue(mockDbGame);

    render(<Processor rawg_id={RAWG_ID} />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(refreshMock).toHaveBeenCalled();
  });
});
