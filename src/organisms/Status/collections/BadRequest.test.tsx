import { BadRequest } from './BadRequest';
import {
  renderTwoRoutes,
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Renders the title and description', async () => {
  await renderWithRouter(<BadRequest />, {
    initialEntries: ['/'],
    routes: ['/'],
  });
  expect(screen.getByText(/bad request/i)).toBeInTheDocument();
});

test('Calls navigate -1 as expected when clicking button', async () => {
  await renderTwoRoutes(<BadRequest />);

  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
