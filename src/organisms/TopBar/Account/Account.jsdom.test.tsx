import { EnvironmentType } from '@equinor/subsurface-app-management';

import { Account } from 'src/organisms/TopBar/Account/Account';
import { MOCK_USER } from 'src/providers/AuthProvider/AuthProvider';
import {
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/jsdomtest-utils';
import { fakeImpersonateUsers } from 'src/tests/mockHandlers';
import { server } from 'src/tests/setupNodeTests';

import { delay, http, HttpResponse } from 'msw';
import { beforeEach } from 'vitest';

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

test('Impersonate button not visible when in prod or if api_client_id is not defined', async () => {
  vi.stubEnv('VITE_API_CLIENT_ID', undefined);
  const { rerender } = renderWithProviders(<Account />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');

  await user.click(button);
  expect(screen.queryByText(/Impersonate/i)).not.toBeInTheDocument();

  vi.stubEnv('VITE_API_CLIENT_ID', 'fake-id');
  vi.stubEnv('VITE_ENVIRONMENT_NAME', 'production');
  rerender(<Account />);
  await user.click(button);
  expect(screen.queryByText(/Impersonate/i)).not.toBeInTheDocument();
});

test('Renders list when roles > 3', async () => {
  vi.stubEnv(
    'VITE_MOCK_ROLES',
    JSON.stringify(['admin', 'user', 'viewer', 'other'])
  );
  const user = userEvent.setup();

  renderWithProviders(<Account />);

  const button = screen.getByRole('button');

  await user.click(button);

  expect(screen.getByRole('list')).toBeInTheDocument();
});

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
    vi.stubEnv('VITE_ENVIRONMENT_NAME', EnvironmentType.DEVELOP);
  });

  test('Active impersonation is set as selected', async () => {
    renderWithProviders(<Account />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    const text = await screen.findByText('Impersonating', undefined, {
      timeout: 4000,
    });
    expect(text).toBeInTheDocument();
  });
});
