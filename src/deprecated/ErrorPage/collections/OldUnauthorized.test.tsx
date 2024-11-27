import { Unauthorized } from 'src/organisms/ErrorPage/collections/Unauthorized';
import {
  render,
  screen,
  testingLibUserEvent,
} from 'src/tests/browsertest-utils';

test('Clicking apply for access opens tab', async () => {
  window.open = vi.fn();
  render(<Unauthorized />);

  const user = testingLibUserEvent.setup();

  await user.click(screen.getByRole('button', { name: /apply for access/i }));

  expect(window.open).toHaveBeenCalledWith(
    'https://accessit.equinor.com/#',
    '_blank'
  );
});
