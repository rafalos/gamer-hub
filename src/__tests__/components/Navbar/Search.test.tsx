import Search from '@/components/Navbar/Search';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pushMock } from '__mocks__/next/navigation';
import { describe, expect, test, vi, beforeEach } from 'vitest';

vi.mock('next/navigation');

const getSearchURL = (query: string) =>
  `/home/search?query=${encodeURIComponent(query)}`;

const SEARCH_PHRASE = 'test';

describe('Navbar <Search />', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  test('renders correctly', () => {
    render(<Search />);

    const searchInput = screen.getByRole('searchbox');

    expect(searchInput).toBeInTheDocument();
  });

  test('input is submitted correctly', async () => {
    const user = userEvent.setup();

    render(<Search />);

    const searchInput = screen.getByRole('searchbox');

    await user.type(searchInput, SEARCH_PHRASE);
    await user.keyboard('{ENTER}');

    expect(pushMock).toHaveBeenCalledWith(getSearchURL(SEARCH_PHRASE));
  });

  test('input is not submitted without any query', async () => {
    const user = userEvent.setup();

    render(<Search />);
    const searchInput = screen.getByRole('searchbox');

    await user.click(searchInput);
    await user.keyboard('{ENTER}');

    expect(pushMock).not.toHaveBeenCalled();
  });
});
