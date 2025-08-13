import { faker } from '@faker-js/faker';
import { waitForElementToBeRemoved, within } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';

import { Account } from './Account';
import { MOCK_USER } from 'src/providers/AuthProvider/AuthProvider';
import {
  renderWithProviders,
  screen,
  test,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Renders correctly without avatar', async () => {
  const user = userEvent.setup();
  renderWithProviders(<Account />);

  expect(screen.queryByText(MOCK_USER.name)).not.toBeInTheDocument();

  const button = screen.getByRole('button');

  const expectedInitials = (accountName: string) => {
    const defaultName = 'XX';
    if (!accountName) return defaultName;

    const nameWithoutParenthesis = accountName
      .replace(/ *\([^)]*\) */g, '')
      .toUpperCase();
    const splitNames = nameWithoutParenthesis.split(' ');

    if (splitNames.length === 1 && splitNames[0] !== '') {
      return splitNames[0].charAt(0);
    }

    if (splitNames.length >= 2) {
      return (
        splitNames[0].charAt(0) + splitNames[splitNames.length - 1].charAt(0)
      );
    }

    return defaultName;
  };

  expect(
    screen.getByText(expectedInitials(MOCK_USER.name))
  ).toBeInTheDocument();

  await user.click(button);

  expect(screen.getByText(MOCK_USER.name)).toBeInTheDocument();

  expect(screen.getByText(/admin/i)).toBeInTheDocument();

  expect(screen.getByText(MOCK_USER.username)).toBeInTheDocument();
  await user.click(document.body);

  expect(screen.queryByText(MOCK_USER.name)).not.toBeInTheDocument();
});

test('Renders correctly when hiding roles', async () => {
  const user = userEvent.setup();
  renderWithProviders(<Account hideRoles />);

  const button = screen.getByRole('button');

  await user.click(button);

  expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
});

test('Children prop works as expected', async () => {
  const user = userEvent.setup();
  const randomText = faker.animal.dog();
  renderWithProviders(
    <Account>
      <p>{randomText}</p>
    </Account>
  );

  const button = screen.getByRole('button');

  expect(screen.queryByText(randomText)).not.toBeInTheDocument();

  await user.click(button);

  expect(screen.getByText(randomText)).toBeInTheDocument();
});

test('Opens and closes as it should', async () => {
  const user = userEvent.setup();

  renderWithProviders(<Account />);

  const button = screen.getByRole('button');

  expect(screen.queryByText(MOCK_USER.username)).not.toBeInTheDocument();

  await user.click(button);

  expect(screen.getByText(MOCK_USER.username)).toBeInTheDocument();

  await user.click(button);

  expect(screen.queryByText(MOCK_USER.username)).not.toBeInTheDocument();
});

test('Rendering custom button works as expected', async () => {
  const customButtonText = faker.animal.cetacean();
  const user = userEvent.setup();
  renderWithProviders(
    <Account
      renderCustomButton={(buttonRef, handleToggle) => (
        <button ref={buttonRef} onClick={handleToggle}>
          {customButtonText}
        </button>
      )}
    />
  );

  const customButton = screen.getByText(customButtonText);

  expect(customButton).toBeInTheDocument();

  await user.click(customButton);

  expect(screen.getByText(MOCK_USER.username)).toBeInTheDocument();

  await user.click(customButton);

  expect(screen.queryByText(MOCK_USER.username)).not.toBeInTheDocument();
});

describe(
  'Impersonate module',
  () => {
    test(
      'Can open, start and end impersonation with existing impersonation user',
      async () => {
        renderWithProviders(<Account />);
        const user = userEvent.setup();
        const button = screen.getByRole('button');

        await user.click(button);

        await waitFor(() =>
          expect(screen.getByText(/Impersonate/i)).toBeInTheDocument()
        );

        await user.click(screen.getByText(/Impersonate/i));

        const availableImpersonationUsers = await screen.findAllByTestId(
          'impersonation-user',
          {},
          { timeout: 2000 }
        );

        for (const user of availableImpersonationUsers) {
          expect(user).toBeInTheDocument();
        }

        const index = faker.number.int({
          min: 0,
          max: availableImpersonationUsers.length - 1,
        });

        let selectUser = availableImpersonationUsers[index];

        let amountOfRoles =
          Number(
            within(selectUser)
              .queryByTestId('additional-roles')
              ?.textContent?.slice(1) ?? 0
          ) + 1;

        while (amountOfRoles === 1) {
          selectUser =
            availableImpersonationUsers[
              (index + 1) % availableImpersonationUsers.length
            ];
          amountOfRoles =
            Number(
              within(selectUser)
                .queryByTestId('additional-roles')
                ?.textContent?.slice(1) ?? 0
            ) + 1;
        }

        const name = within(selectUser).getByTestId('name').innerHTML;

        const impersonateButton = screen.getByRole('button', {
          name: 'Impersonate',
        });

        // Haven't selected a user yet so the button is expected to be disabled
        expect(impersonateButton).toBeDisabled();

        await user.click(selectUser);

        expect(impersonateButton).not.toBeDisabled();

        await user.click(impersonateButton);

        await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

        // Chip with '+1' for example
        expect(
          await screen.findByText(`+${amountOfRoles - 1}`)
        ).toBeInTheDocument();

        await user.click(button);

        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText('Impersonating')).toBeInTheDocument();

        await user.click(
          screen.getByRole('button', {
            name: `${MOCK_USER.name.split(' ').at(0)} ${MOCK_USER.username}`,
          })
        );

        expect(
          screen.getByRole('button', { name: 'Impersonate' })
        ).toBeDisabled();

        // Close Account menu
        await user.click(screen.getByRole('button', { name: 'Cancel' }));

        // Re-open menu
        await user.click(button);

        const endButton = screen.getByRole('button', {
          name: /end impersonation/i,
        });

        expect(endButton).toBeInTheDocument();

        await user.click(endButton);

        await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

        await user.click(button);

        expect(screen.queryByText('Impersonating')).not.toBeInTheDocument();
      },
      { timeout: 8000 }
    );

    test('Can search for user impersonations', async () => {
      renderWithProviders(<Account />);
      const user = userEvent.setup();
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() =>
        expect(screen.getByText(/Impersonate/i)).toBeInTheDocument()
      );

      await user.click(screen.getByText(/Impersonate/i));

      const availableImpersonationUsers =
        await screen.findAllByTestId('impersonation-user');

      const randomUserIndex = faker.number.int({
        min: 0,
        max: availableImpersonationUsers.length - 1,
      });
      const randomUser =
        within(availableImpersonationUsers[randomUserIndex]).getByTestId('name')
          .textContent ?? 'failed';

      const searchInput = screen.getByPlaceholderText('Search users');

      await user.type(searchInput, randomUser);

      for (const [index, user] of availableImpersonationUsers.entries()) {
        if (index === randomUserIndex) {
          expect(user).toBeInTheDocument();
        } else {
          expect(user).not.toBeInTheDocument();
        }
      }
    });

    test('Shows expected text when search has no results', async () => {
      renderWithProviders(<Account />);
      const user = userEvent.setup();
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() =>
        expect(screen.getByText(/Impersonate/i)).toBeInTheDocument()
      );

      await user.click(screen.getByText(/Impersonate/i));

      const searchInput = screen.getByPlaceholderText('Search users');

      const randomText = faker.animal.dog();

      await user.type(searchInput, randomText);

      expect(screen.getByText(/no items found/i)).toBeInTheDocument();
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

      expect(await screen.findByText(/Impersonate/i)).toBeInTheDocument();

      await user.click(screen.getByText(/Impersonate/i));
      const availableImpersonationUsers =
        await screen.findAllByTestId('impersonation-user');

      for (const user of availableImpersonationUsers) {
        expect(user).toBeInTheDocument();
      }

      await user.click(screen.getByText('outside'));

      expect(
        screen.queryByTestId('impersonation-user')
      ).not.toBeInTheDocument();
    });
  },
  { concurrent: false, sequential: true }
);
