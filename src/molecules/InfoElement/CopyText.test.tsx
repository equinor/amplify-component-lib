import CopyText from 'src/molecules/InfoElement/CopyText';
import {
  render,
  screen,
  testingLibUserEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

test('Renders label on hover', async () => {
  render(<CopyText textToCopy="Test">testing text</CopyText>);
  const user = testingLibUserEvent.setup();

  const wrapper = screen.getByText('testing text');

  await user.hover(wrapper);

  await waitFor(() => screen.getByText(/copy/i));
  expect(screen.getByText(/copy/i)).toBeInTheDocument();

  await user.unhover(wrapper);
  expect(screen.queryByText(/copy/i)).not.toBeInTheDocument();
});

test('Copies text to clipboard and displays success message', async () => {
  render(<CopyText textToCopy="Test">testing text</CopyText>);
  const user = testingLibUserEvent.setup();

  let clipboard = '';

  // Mock navigator object
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: (val: string) => new Promise(() => (clipboard = val)),
    },
  });

  const wrapper = screen.getByText('testing text');
  await user.click(wrapper);

  expect(clipboard).toBe('Test');
  expect(screen.getByText(/copied!/i)).toBeInTheDocument();

  await waitFor(() => screen.getByText(/copy/i), { timeout: 5000 });
  expect(screen.getByText(/copy/i)).toBeInTheDocument();
});
