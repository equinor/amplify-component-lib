import { MissingAccessToApp } from 'src/organisms';
import { render, screen, userEvent } from 'src/tests/test-utils';

test('Renders the title and description', () => {
  render(<MissingAccessToApp />);
  expect(screen.getByText(/you don't have access to/i)).toBeInTheDocument();
  expect(
    screen.getByText(/You can apply for acces to the app in AccessIT/i)
  ).toBeInTheDocument();
});

test('Opens AccessIT when clicking button', async () => {
  render(<MissingAccessToApp />);
  const user = userEvent.setup();

  window.open = vi.fn();

  await user.click(screen.getByRole('button'));

  expect(window.open).toHaveBeenCalledWith(
    `https://www.accessit.equinor.com/Search/Search?term=${encodeURIComponent('Amplify components')}`,
    '_blank'
  );
});
