import { ServerError } from './ServerError';
import {
  renderTwoRoutes,
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Renders the title and description', async () => {
  await renderWithRouter(<ServerError />);
  expect(
    screen.getByText(/Something is wrong on our servers/i)
  ).toBeInTheDocument();
});

test('Calls navigate -1 as expected when clicking button', async () => {
  await renderTwoRoutes(<ServerError />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
