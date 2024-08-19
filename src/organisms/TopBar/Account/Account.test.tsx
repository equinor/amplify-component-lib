import { faker } from '@faker-js/faker';
import { waitForElementToBeRemoved, within } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';

import { Account } from './Account';
import { MOCK_USER } from 'src/providers/AuthProvider/AuthProvider';
import { fakeImpersonateUsers } from 'src/tests/mockHandlers';
import { server } from 'src/tests/setupTests';
import { renderWithProviders, screen, userEvent } from 'src/tests/test-utils';

import { delay, http, HttpResponse } from 'msw';

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

test('Renders correctly with avatar', async () => {
  const user = userEvent.setup();
  vi.stubEnv('VITE_MOCK_USER_PHOTO', 'true');
  renderWithProviders(<Account />);

  const accountName = MOCK_USER.name;
  expect(screen.queryByText(accountName)).not.toBeInTheDocument();

  const button = screen.getByRole('button');

  expect(screen.getByAltText(`user-avatar-${accountName}`)).toBeInTheDocument();

  await user.click(button);

  expect(screen.getByText(/admin/i)).toBeInTheDocument();
  expect(screen.getAllByAltText(`user-avatar-${accountName}`).length).toBe(2);
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

        const availableImpersonationUsers =
          screen.getAllByTestId('impersonation-user');

        for (const user of availableImpersonationUsers) {
          expect(user).toBeInTheDocument();
        }

        const index = faker.number.int({
          min: 0,
          max: availableImpersonationUsers.length - 1,
        });

        let selectUser = availableImpersonationUsers[index];

        let amountOfRoles = within(selectUser).getAllByTestId('role').length;

        while (amountOfRoles === 1) {
          selectUser =
            availableImpersonationUsers[
              (index + 1) % availableImpersonationUsers.length
            ];
          amountOfRoles = within(selectUser).getAllByTestId('role').length;
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
        expect(screen.getByText(`+${amountOfRoles - 1}`)).toBeInTheDocument();

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

      expect(
        screen.queryByTestId('impersonation-user')
      ).not.toBeInTheDocument();
    });

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
  },
  { concurrent: false, sequential: true }
);
