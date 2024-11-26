import { waitForElementToBeRemoved } from '@testing-library/dom';

import { Account } from 'src/organisms/TopBar/Account/Account';
import {
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/jsdomtest-utils';
import { fakeImpersonateUsers } from 'src/tests/mockHandlers';
import { server } from 'src/tests/setupNodeTests';

import { delay, http, HttpResponse } from 'msw';

describe('Active impersonation', () => {
  beforeEach(() => {
    server.use(
      http.get(
        '*/api/v1/ImpersonateUser/ActiveUser',
        async () => {
          await delay('real');
          return HttpResponse.json(fakeImpersonateUsers[0]);
        },
        { once: true }
      )
    );
  });

  test('Active impersonation gets removed when in different application', async () => {
    vi.stubEnv('VITE_NAME', 'different-app');

    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    await waitForElementToBeRemoved(() => screen.getByText('Impersonating'));
    expect(screen.queryByText('Impersonating')).not.toBeInTheDocument();
  });
});
