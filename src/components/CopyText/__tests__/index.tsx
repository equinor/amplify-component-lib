import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import CopyText from '../index';

test('Renders without crashing', () => {
  render(<CopyText textToCopy="Test"></CopyText>);
});

test('Renders label on hover', async () => {
  render(<CopyText textToCopy="Test"></CopyText>);
  const user = userEvent.setup();

  const wrapper = screen.getByTestId('copyTextWrapper');

  await user.hover(wrapper);

  expect(screen.getByText('Copy')).toBeInTheDocument();
});

test('Copies text to clipbard and displays success message', async () => {
  render(<CopyText textToCopy="Test"></CopyText>);
  const user = userEvent.setup();

  let clipboard = '';

  // Mock navigator object
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: (val: string) => (clipboard = val),
    },
  });

  const wrapper = screen.getByTestId('copyTextWrapper');
  await user.click(wrapper);

  expect(clipboard).toBe('Test');
  expect(screen.getByText('Copied!')).toBeInTheDocument();
});
