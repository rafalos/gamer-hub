import Actions from '@/components/Navbar/Actions';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

const MOCK_USERNAME = 'test';

const signOutMock = vi.fn();

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signOut: async () => signOutMock(),
  },
}));

describe('Navbar <Actions />', () => {
  test('sign off function is fired correctly', async () => {
    const user = userEvent.setup();

    render(<Actions name={MOCK_USERNAME} />);

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    await user.click(logoutBtn);
    expect(signOutMock).toHaveBeenCalled();
  });
});
