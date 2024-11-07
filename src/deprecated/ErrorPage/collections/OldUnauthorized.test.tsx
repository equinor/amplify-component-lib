import { OldUnauthorized } from 'src/deprecated/ErrorPage/collections/OldUnauthorized';
import { render, screen, userEvent } from 'src/tests/test-utils';

test('Clicking apply for access opens tab', async () => {
  window.open = vi.fn();
  render(<OldUnauthorized />);

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /apply for access/i }));

  expect(window.open).toHaveBeenCalledWith(
    'https://accessit.equinor.com/#',
    '_blank'
  );
});
