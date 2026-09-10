import { RoleSyncNotifier } from './RoleSyncNotifier';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { renderWithProviders, screen, userEvent } from 'src/tests/browsertest-utils';

vi.mock('src/providers/AuthProvider/AuthProvider', async (importOriginal) => {
  const actual = await importOriginal<
    typeof import('src/providers/AuthProvider/AuthProvider')
  >();
  return { ...actual, useAuth: vi.fn() };
});

function mockAuth(rolesOutdated: boolean, applyNewRoles = vi.fn()) {
  vi.mocked(useAuth).mockReturnValue({
    account: undefined,
    photo: undefined,
    roles: ['sam:read'],
    logout: vi.fn(),
    authState: 'authorized',
    rolesOutdated,
    applyNewRoles,
  });
  return applyNewRoles;
}

test('shows nothing when roles are up to date', () => {
  mockAuth(false);

  renderWithProviders(<RoleSyncNotifier />);

  expect(
    screen.queryByText(/access has changed/i)
  ).not.toBeInTheDocument();
});

test('shows a Snackbar prompting the user to refresh when roles are outdated, and applies them on click', async () => {
  const applyNewRoles = mockAuth(true);
  const user = userEvent.setup();

  renderWithProviders(<RoleSyncNotifier />);

  expect(
    await screen.findByText(/access has changed/i)
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /refresh/i }));

  expect(applyNewRoles).toHaveBeenCalledTimes(1);
});

test('supports custom text and action label', async () => {
  mockAuth(true);

  renderWithProviders(
    <RoleSyncNotifier text="New roles available" actionText="Apply" />
  );

  expect(await screen.findByText('New roles available')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /apply/i })
  ).toBeInTheDocument();
});
