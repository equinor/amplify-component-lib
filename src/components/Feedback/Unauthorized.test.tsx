import { render, screen, userEvent } from '../../tests/test-utils';
import { Unauthorized } from './Unauthorized';

test('Clicking apply for access opens tab', async () => {
  window.open = vi.fn();
  render(<Unauthorized />);

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /apply for access/i }));

  expect(window.open).toHaveBeenCalledWith(
    'https://accessit.equinor.com/#',
    '_blank'
  );
});
