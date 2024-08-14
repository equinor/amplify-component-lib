import { waitFor } from '@testing-library/react';

import { Account } from 'src/organisms/TopBar/Account/Account';
import { fakeImpersonateUsers } from 'src/tests/mockHandlers';
import { server } from 'src/tests/setupTests';
import { renderWithProviders, screen, userEvent } from 'src/tests/test-utils';

import { delay, http, HttpResponse } from 'msw';
import { beforeEach } from 'vitest';

describe('Active impersonation', () => {
  beforeEach(() => {
    server.use(
      http.get(
        '*/api/v1/ImpersonateUser/ActiveUserByUsername',
        async () => {
          await delay('real');
          return HttpResponse.json(fakeImpersonateUsers[0]);
        },
        { once: true }
      )
    );
  });

  test('Active impersonation is set as selected', async () => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    const text = await screen.findByText('Impersonating');
    expect(text).toBeInTheDocument();
  });

  test('ImpersonateMenu onClose works as expected', async () => {
    renderWithProviders(
      <>
        <Account />
        <p>outside</p>
      </>
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    await waitFor(() =>
      expect(screen.getByText(/Impersonate/i)).toBeInTheDocument()
    );

    await user.click(screen.getByText(/Impersonate/i));

    const availableImpersonationUsers =
      screen.getAllByTestId('impersonation-user');

    for (const user of availableImpersonationUsers) {
      expect(user).toBeInTheDocument();
    }

    await user.click(screen.getByText('outside'));

    expect(screen.queryByTestId('impersonation-user')).not.toBeInTheDocument();
  });
});
