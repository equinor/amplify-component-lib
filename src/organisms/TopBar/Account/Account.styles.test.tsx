import { Account } from 'src/organisms/TopBar/Account/Account';
import { MOCK_USER } from 'src/providers/AuthProvider/AuthProvider';
import {
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

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
