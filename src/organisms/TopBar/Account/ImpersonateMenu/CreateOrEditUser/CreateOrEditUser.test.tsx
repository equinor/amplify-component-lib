import { faker } from '@faker-js/faker';
import { waitForElementToBeRemoved, within } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';

import { Account } from '../../Account';
import { FAKE_ROLES } from 'src/tests/mockHandlers';
import { renderWithProviders, screen, userEvent } from 'src/tests/test-utils';

describe('CreateNewUser', () => {
  test('Able to open/close create new', async () => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /impersonate/i })
      ).toBeInTheDocument()
    );
    await user.click(screen.getByRole('button', { name: /impersonate/i }));

    await user.click(screen.getByRole('button', { name: /create/i }));

    expect(
      screen.getByRole('textbox', { name: /first name/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /cancel/i }));
  });

  test('OnClose runs as expected in create new', async () => {
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

  test('Able to edit existing user impersonation', async () => {
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

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    const textBox = screen.getByRole('textbox', { name: /first name/i });
    await user.clear(textBox);

    const newFirstName = faker.person.firstName();
    await user.type(textBox, newFirstName);

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(
      await screen.findByText(new RegExp(newFirstName))
    ).toBeInTheDocument();
  });

  test(
    'Able to create new impersonation user',
    async () => {
      renderWithProviders(<Account />);
      const user = userEvent.setup();
      const button = screen.getByRole('button');

      await user.click(button);

      const impersonateButton = await screen.findByRole('button', {
        name: /impersonate/i,
      });

      await user.click(impersonateButton);

      await user.click(screen.getByRole('button', { name: /create users/i }));

      const createButton = screen.getByRole('button', {
        name: /create and impersonate/i,
      });

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

      const roles = faker.helpers
        .arrayElements(FAKE_ROLES, {
          min: 2,
          max: FAKE_ROLES.length - 1,
        })
        .map((role) => role.value)
        .sort();

      await user.click(screen.getByRole('combobox'));

      for (const role of roles) {
        await user.click(screen.getByText(role));
      }

      expect(createButton).not.toBeDisabled();

      await user.click(createButton);

      await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

      expect(await screen.findByText(roles[0])).toBeInTheDocument();

      await user.click(button);

      await user.click(
        screen.getByRole('button', { name: /end impersonation/i })
      );
    },
    { timeout: 8000 }
  );

  test('Able to edit active user impersonation', async () => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    const impersonateButton = await screen.findByRole('button', {
      name: /impersonate/i,
    });

    await user.click(impersonateButton);

    // Select the first one
    await user.click(screen.getAllByTestId('impersonation-user')[0]);

    // Activate impersonation
    await user.click(screen.getByRole('button', { name: 'Impersonate' }));

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    // Open menu again
    await user.click(button);

    // Open impersonate menu
    // Our account.name in the test env is Mock
    await user.click(screen.getByRole('button', { name: /mock/i }));

    const menuItems = screen.getAllByTestId('impersonation-user');
    expect(menuItems.length).toBeGreaterThan(0);

    // Click edit on the first one
    await user.click(within(menuItems[0]).getByRole('button'));

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    const textBox = screen.getByRole('textbox', { name: /first name/i });
    await user.clear(textBox);

    const newFirstName = faker.person.firstName();
    await user.type(textBox, newFirstName);

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(
      await screen.findByText(new RegExp(newFirstName))
    ).toBeInTheDocument();
  });
});
