import { PageNotFound } from './PageNotFound';
import {
  renderTwoRoutes,
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Renders the title and description', async () => {
  await renderWithRouter(<PageNotFound />);
  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});

test('Calls navigate -1 as expected when clicking button', async () => {
  await renderTwoRoutes(<PageNotFound />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
