import { mockRawgGame } from '__mocks__/game';
import Cta from '@/components/GameItem/Cta';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { ctaAction } from '@/components/GameItem/actions';

vi.mock('@/components/GameItem/actions.ts', () => ({
  ctaAction: vi.fn(),
}));

describe('<Cta />', () => {
  test('renders two action buttons', () => {
    render(
      <Cta isInLibrary={false} id={mockRawgGame.id} isWishlisted={false} />
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
  });

  test('when game is added to library then add to library button is disabled', () => {
    render(
      <Cta isInLibrary={true} isWishlisted={false} id={mockRawgGame.id} />
    );

    const button: HTMLButtonElement = screen.getByRole('button', {
      name: 'In library',
    });

    expect(button).toBeDisabled();
  });

  test('calls proper action when adding game to library', () => {
    const GAME_IN_LIBRARY = false;

    render(
      <Cta
        isInLibrary={GAME_IN_LIBRARY}
        id={mockRawgGame.id}
        isWishlisted={false}
      />
    );

    const button: HTMLButtonElement = screen.getByRole('button', {
      name: /library/,
    });

    fireEvent.click(button);

    expect(ctaAction).toHaveBeenCalledWith(
      GAME_IN_LIBRARY,
      mockRawgGame.id.toString()
    );
  });
});
