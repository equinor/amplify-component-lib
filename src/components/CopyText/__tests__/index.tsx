import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import CopyText from '../index';

test('Renders without crashing', () => {
  render(<CopyText textToCopy="Test"></CopyText>);
});

test('Renders label on hover', () => {
  render(<CopyText textToCopy="Test"></CopyText>);

  const wrapper = screen.getByTestId('copyTextWrapper');

  userEvent.hover(wrapper);

  expect(screen.getByText('Copy')).toBeInTheDocument();
});

test('Copies text to clipbard and displays success message', () => {
  render(<CopyText textToCopy="Test"></CopyText>);

  let clipboard = '';

  // Mock navigator object
  Object.assign(navigator, {
    clipboard: {
      writeText: (val: string) => (clipboard = val),
    },
  });

  const wrapper = screen.getByTestId('copyTextWrapper');
  userEvent.click(wrapper);

  expect(clipboard).toBe('Test');
  expect(screen.getByText('Copied!')).toBeInTheDocument();
});
