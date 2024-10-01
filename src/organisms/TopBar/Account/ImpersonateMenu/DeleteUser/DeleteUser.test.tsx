import { faker } from '@faker-js/faker';

import { Account } from 'src/organisms/TopBar/Account/Account';
import { fakeImpersonateUsers } from 'src/tests/mockHandlers';
import { server } from 'src/tests/setupTests';
import {
  renderWithProviders,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from 'src/tests/test-utils';

import { delay, http, HttpResponse } from 'msw';

test('Able to delete user impersonation', async () => {
  renderWithProviders(<Account />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');

  await user.click(button);

  const impersonateButton = await screen.findByRole('button', {
    name: /impersonate/i,
  });

  await user.click(impersonateButton);

  const menuItems = screen.getAllByTestId('impersonation-user');
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
});

test('Not able to delete user impersonation with activeUsers', async () => {
  server.use(
    http.get(
      '*/api/v1/ImpersonateUser/GetImpersonateUserForApp/:appName',
      async () => {
        await delay('real');
        const copy = structuredClone(fakeImpersonateUsers);
        copy[0].activeUsers.push(faker.internet.userName());
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

  const menuItems = screen.getAllByTestId('impersonation-user');
  expect(menuItems.length).toBeGreaterThan(0);

  // Click edit on the first one
  await user.click(within(menuItems[0]).getByRole('button'));

  expect(screen.getByRole('button', { name: /delete user/i })).toBeDisabled();
});
