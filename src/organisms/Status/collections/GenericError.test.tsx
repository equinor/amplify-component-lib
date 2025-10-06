import { GenericError } from './GenericError';
import {
  renderTwoRoutes,
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Renders the title and description', async () => {
  await renderWithRouter(<GenericError />, {
    initialEntries: ['/'],
    routes: ['/'],
  });
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});

test('Calls navigate -1 as expected when clicking button', async () => {
  await renderTwoRoutes(<GenericError />);

  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
