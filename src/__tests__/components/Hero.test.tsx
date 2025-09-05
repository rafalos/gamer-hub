import { test, vi, expect, describe, beforeEach } from 'vitest';
import Hero from '@/components/Hero';
import { fireEvent, render, screen } from '@testing-library/react';
import { pushMock } from '__mocks__/next/navigation';

vi.mock('next/navigation');

describe('<Hero />', () => {
  beforeEach(() => {
    pushMock.mockClear()
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
