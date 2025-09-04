import { test, vi, expect, describe, beforeEach } from 'vitest';
import Hero from '@/components/Hero';
import { fireEvent, render, screen } from '@testing-library/react';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('<Hero />', () => {
  beforeEach(() => {
    pushMock.mockReset();
  });
  test('Renders properly', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', {
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Redirects properly', () => {
    vi.useFakeTimers();

    render(<Hero />);
    fireEvent.click(screen.getByText('Explore...'));

    vi.advanceTimersByTime(400);

    expect(pushMock).toHaveBeenCalledWith('/home');
    vi.useRealTimers();
  });
});
