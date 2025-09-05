import Count from '@/components/Footer/Count';
import { useFooterStore } from '@/store/footer.store';
import { render, screen, act } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';

const INITIAL_COUNT = 1;
const INITIAL_STORE_COUNT = 0;

vi.mock('@/store/footer.store', () => ({
  useFooterStore: vi.fn(),
}));

describe('Footer <Count />', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.mocked(useFooterStore).mockReturnValue(INITIAL_STORE_COUNT);
  });

  test('renders initial count correctly', () => {
    render(<Count initialCount={INITIAL_COUNT} />);

    const count = screen.getByText(INITIAL_COUNT.toString());

    expect(count).toBeInTheDocument();
  });

  test('animation is correctly handled when store count changes', () => {
    vi.useFakeTimers();

    const NEW_COUNT = INITIAL_STORE_COUNT + 1;

    const { rerender } = render(<Count initialCount={INITIAL_COUNT} />);

    act(() => {
      vi.mocked(useFooterStore).mockReturnValue(NEW_COUNT);
      rerender(<Count initialCount={INITIAL_COUNT} />);
    });

    const container = screen.getByText(INITIAL_COUNT.toString());

    expect(container.className).toContain('animate-scale-up');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(container.className).not.toContain('animate-scale-up');
  });
});
