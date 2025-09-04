import { mockedSession } from '@/__mocks__/auth';
import ItemGrid from '@/components/ItemGrid';
import { auth } from '@/lib/auth';
import { Session, User } from '@/types/db';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const mockData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const mockLibrary = ['lib1', 'lib2'];

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

vi.mock('@/db/queries', () => ({
  getUserLibrary: vi.fn(() => mockLibrary),
}));

vi.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<ItemGrid />', () => {
  test('render is called proper amount of times', async () => {
    const renderMock = vi.fn();

    const ui = await ItemGrid({
      data: mockData,
      render: renderMock,
    });
    render(ui);

    expect(renderMock).toBeCalledTimes(mockData.length);
  });

  test('renders given components correctly', async () => {
    const renderMock = vi.fn((data, id, library) => <div>item-{id}</div>);

    const ui = await ItemGrid({
      data: mockData,
      render: renderMock,
    });

    render(ui);

    const elements = await screen.findAllByText(/item-/);

    expect(elements).toHaveLength(mockData.length);
  });

  test('gets empty library when user is not logged in', async () => {
    const renderMock = vi.fn();

    const ui = await ItemGrid({
      data: mockData,
      render: renderMock,
    });

    render(ui);

    const libraryArg = renderMock.mock.calls[0][2];
    expect(libraryArg).toHaveLength(0);
  });

  test('gets proper library when user is logged in', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValueOnce({
      ...mockedSession,
    });

    const renderMock = vi.fn();

    const ui = await ItemGrid({
      data: mockData,
      render: renderMock,
    });

    render(ui);

    const libraryArg = renderMock.mock.calls[0][2];
    expect(libraryArg).toHaveLength(2);
  });
});
