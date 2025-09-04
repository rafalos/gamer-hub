import { test, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameItem from '@/components/GameItem';
import { mockRawgGame } from '@/__mocks__/game';

describe('<GameItem />', () => {
  test('Displays game name properly', () => {
    render(<GameItem game={mockRawgGame} isInLibrary={false} />);

    const gameName = screen.getByText(mockRawgGame.name);

    expect(gameName).toBeDefined();
  });
});
