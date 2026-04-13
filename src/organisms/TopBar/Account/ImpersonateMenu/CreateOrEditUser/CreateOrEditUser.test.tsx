import { faker } from '@faker-js/faker';
import { waitForElementToBeRemoved, within } from '@testing-library/dom';

import { Account } from '../../Account';
import {
  renderWithProviders,
  screen,
  test,
  userEvent,
} from 'src/tests/browsertest-utils';
import { FAKE_ROLES } from 'src/tests/mockHandlers';

test.sequential('Able to open/close create new', async () => {
  renderWithProviders(<Account />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');

  await user.click(button);

  const impersonateButton = await screen.findByRole('button', {
    name: 'Impersonate',
  });
  await user.click(impersonateButton);

  await user.click(screen.getByRole('button', { name: /create/i }));

  expect(
    screen.getByRole('textbox', { name: /first name/i })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /cancel/i }));
});

test.sequential(
  'Able to open/close edit',
  async () => {
    renderWithProviders(
      <>
        <p>outside</p>
        <Account />
      </>
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    await user.click(
      await screen.findByRole('button', { name: 'Impersonate' })
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no items found/i)
    );

    const menuItems = await screen.findAllByTestId('impersonation-user');
    expect(menuItems.length).toBeGreaterThan(0);

    // Click edit on the first one
    await user.click(within(menuItems[0]).getByRole('button'));

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    expect(
      screen.getByRole('textbox', { name: /first name/i })
    ).toBeInTheDocument();

    await user.click(screen.getByText('outside'));

    await user.click(button);

    await user.click(
      await screen.findByRole('button', { name: 'Impersonate' })
    );

    await user.click(screen.getByRole('button', { name: /create/i }));
    expect(screen.queryByText('Edit user')).not.toBeInTheDocument();
  },
  { timeout: 6000 }
);

test.sequential('OnClose runs as expected in create new', async () => {
  renderWithProviders(
    <>
      <Account />
      <p>outside</p>
    </>
  );
  const user = userEvent.setup();
  const button = screen.getByRole('button');

  await user.click(button);

  const impersonateButton = await screen.findByRole('button', {
    name: /impersonate/i,
  });

  await user.click(impersonateButton);

  await user.click(screen.getByRole('button', { name: /create/i }));

  expect(
    screen.getByRole('textbox', { name: /first name/i })
  ).toBeInTheDocument();

  await user.click(screen.getByText('outside'));

  expect(
    screen.queryByRole('textbox', { name: /first name/i })
  ).not.toBeInTheDocument();
});

test.each(['email', 'no-email'])(
  'Able to edit existing user impersonation - %s',
  async (testCase) => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    await user.click(
      await screen.findByRole('button', { name: 'Impersonate' })
    );

    const menuItems = await screen.findAllByTestId('impersonation-user');
    expect(menuItems.length).toBeGreaterThan(0);

    // Click edit on the first one
    await user.click(within(menuItems[0]).getByRole('button'));

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

    const textBox = screen.getByRole('textbox', { name: /first name/i });
    await user.clear(textBox);

    const newFirstName = faker.person.firstName();
    await user.type(textBox, newFirstName);

    if (testCase === 'email') {
      await user.type(
        screen.getByRole('textbox', { name: /e-mail/i }),
        faker.internet.email()
      );
    } else if (testCase === 'no-email') {
      await user.clear(screen.getByRole('textbox', { name: /e-mail/i }));
    }

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(
      await screen.findByText(new RegExp(newFirstName))
    ).toBeInTheDocument();
  },
  { timeout: 8000 }
);

test.sequential('Edit another user clears the form as expected', async () => {
  renderWithProviders(<Account />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');

  await user.click(button);

  await user.click(await screen.findByRole('button', { name: 'Impersonate' }));

  const menuItems = await screen.findAllByTestId('impersonation-user');
  expect(menuItems.length).toBeGreaterThan(0);

  // Click edit on the first one
  await user.click(within(menuItems[0]).getByRole('button'));

  await user.click(screen.getByRole('button', { name: /edit user/i }));

  await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

  const textBox = screen.getByRole('textbox', {
    name: /first name/i,
  }) as HTMLInputElement;
  const firstName = textBox.value;

  await user.click(screen.getByRole('button', { name: /cancel/i }));

  const newMenuItems = await screen.findAllByTestId('impersonation-user');
  await user.click(within(newMenuItems[1]).getByRole('button'));

  await user.click(screen.getByRole('button', { name: /edit user/i }));

  const otherName = (
    screen.getByRole('textbox', { name: /first name/i }) as HTMLInputElement
  ).value;

  expect(otherName).not.toBe(firstName);
});

test.each(['email', 'no-email'])(
  'Able to create new impersonation user - %s',
  async (testCase) => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    await user.click(
      await screen.findByRole('button', { name: 'Impersonate' })
    );

    await user.click(screen.getByRole('button', { name: /create users/i }));

    await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

    const createButton = screen.getByRole('button', { name: /create/i });

    expect(createButton).toBeDisabled();

    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();

    await user.type(
      screen.getByRole('textbox', { name: /first name/i }),
      fakeFirstName
    );
    await user.type(
      screen.getByRole('textbox', { name: /last name/i }),
      fakeLastName
    );

    if (testCase === 'email') {
      await user.type(
        screen.getByRole('textbox', { name: /e-mail/i }),
        faker.internet.email()
      );
    } else if (testCase === 'no-email') {
      await user.clear(screen.getByRole('textbox', { name: /e-mail/i }));
    }

    const roles = faker.helpers
      .arrayElements(FAKE_ROLES, { min: 2, max: FAKE_ROLES.length - 1 })
      .map((role) => role.displayName)
      .sort();

    await user.click(screen.getByRole('combobox', { name: /roles/i }));

    for (const role of roles) {
      const roleElement = await screen.findByText(role);
      await user.click(roleElement);
    }

    expect(createButton).not.toBeDisabled();

    await user.click(createButton);

    await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'));

    expect(
      await screen.findByText(`${fakeFirstName} ${fakeLastName}`)
    ).toBeInTheDocument();
  },
  { timeout: 8000 }
);

test.sequential(
  'Able to edit active user impersonation',
  async () => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    await user.click(
      await screen.findByRole('button', { name: 'Impersonate' })
    );

    // Select the first one
    const all = await screen.findAllByTestId('impersonation-user');
    await user.click(all[0]);

    // Activate impersonation
    await user.click(screen.getByRole('button', { name: 'Impersonate' }));

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    // Open menu again
    await user.click(button);

    // Open impersonate menu
    // Our account.name in the test env is Mock
    await user.click(screen.getByRole('button', { name: /mock/i }));

    const menuItems = await screen.findAllByTestId('impersonation-user');
    expect(menuItems.length).toBeGreaterThan(0);

    // Click edit on the first one
    await user.click(within(menuItems[0]).getByRole('button'));

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    const textBox = screen.getByRole('textbox', { name: /first name/i });
    await user.clear(textBox);

    const newFirstName = faker.person.firstName();
    await user.type(textBox, newFirstName);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(
      await screen.findByText(new RegExp(newFirstName))
    ).toBeInTheDocument();
  },
  { timeout: 10000 }
);
