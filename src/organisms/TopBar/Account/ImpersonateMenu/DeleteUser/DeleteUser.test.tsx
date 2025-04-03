import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/react';

import { Account } from 'src/organisms/TopBar/Account/Account';
import {
  renderWithProviders,
  screen,
  test,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from 'src/tests/browsertest-utils';
import { fakeImpersonateUsers } from 'src/tests/mockHandlers';

import { delay, http, HttpResponse } from 'msw';

test(
  'Able to delete user impersonation',
  async () => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    const impersonateButton = await screen.findByRole('button', {
      name: /impersonate/i,
    });

    await user.click(impersonateButton);

    const menuItems = await screen.findAllByTestId(
      'impersonation-user',
      undefined,
      { timeout: 1500 }
    );
    expect(menuItems.length).toBeGreaterThan(0);

    const name = menuItems[0].children[1].textContent!;

    // Click edit on the first one
    await user.click(within(menuItems[0]).getByRole('button'));

    await user.click(screen.getByRole('button', { name: /delete user/i }));

    expect(
      await screen.findByText(/you are deleting a user/i)
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /delete user/i }));

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.queryByText(name)).not.toBeInTheDocument();
  },
  { timeout: 6000 }
);

test('Not able to delete user impersonation with activeUsers', async ({
  worker,
}) => {
  worker.use(
    http.get('*/api/v1/Token/AmplifyPortal/*', async () => {
      await delay('real');
      return HttpResponse.text(faker.string.nanoid());
    }),
    http.get('*/api/v1/ImpersonateUser/CanImpersonate', async () => {
      return HttpResponse.text('true');
    }),
    http.get('*/api/v1/ImpersonateUser/ActiveUser', async () => {
      return HttpResponse.json(undefined, { status: 204 });
    }),
    http.get(
      '*/api/v1/ImpersonateUser/GetImpersonateUserForApp/:appName',
      async () => {
        const copy = structuredClone(fakeImpersonateUsers);
        for (const item of copy) {
          item.activeUsers = [faker.internet.username()];
        }
        return HttpResponse.json(copy);
      }
    )
  );

  renderWithProviders(<Account />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');

  await user.click(button);

  const impersonateButton = await screen.findByRole('button', {
    name: /impersonate/i,
  });

  await user.click(impersonateButton);

  const menuItems = await screen.findAllByTestId('impersonation-user');
  expect(menuItems.length).toBeGreaterThan(0);

  // Click edit on the first one
  await user.click(within(menuItems[0]).getByRole('button'));

  await waitFor(
    () =>
      expect(
        screen.getByRole('button', { name: /delete user/i })
      ).toBeDisabled(),
    { timeout: 3000 }
  );
});
