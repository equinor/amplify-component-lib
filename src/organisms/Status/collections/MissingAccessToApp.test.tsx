import { MissingAccessToApp } from 'src/organisms';
import {
  renderWithRouter,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

test('Renders the title and description', async () => {
  await renderWithRouter(<MissingAccessToApp />);
  expect(screen.getByText(/you don't have access to/i)).toBeInTheDocument();
  expect(
    screen.getByText(/You can apply for acces to the app in AccessIT/i)
  ).toBeInTheDocument();
});

test('Opens AccessIT when clicking button', async () => {
  await renderWithRouter(<MissingAccessToApp />);
  const user = userEvent.setup();

  window.open = vi.fn();

  await user.click(screen.getByRole('button'));

  expect(window.open).toHaveBeenCalledWith(
    `https://accessit.equinor.com/Search/Search?term=${encodeURIComponent('Amplify components')}`,
    '_blank'
  );
});
