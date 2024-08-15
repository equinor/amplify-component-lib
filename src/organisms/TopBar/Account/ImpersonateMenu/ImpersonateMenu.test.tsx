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
});
