import { MissingPermissions } from './MissingPermissions';
import {
  renderTwoRoutes,
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Renders the title and description', async () => {
  await renderWithRouter(<MissingPermissions />);
  expect(
    screen.getByText(/you don't have permission to access this page./i)
  ).toBeInTheDocument();
});

test('Calls navigate -1 as expected when clicking button', async () => {
  await renderTwoRoutes(<MissingPermissions />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
