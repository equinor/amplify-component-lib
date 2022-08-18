import '@testing-library/jest-dom/extend-expect';

import { render, screen } from 'src/test-utils';

import CopyText from './CopyText';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

test('Renders label on hover', async () => {
  render(<CopyText textToCopy="Test">testing text</CopyText>);
  const user = userEvent.setup();

  const wrapper = screen.getByText('testing text');

  await user.hover(wrapper);

  await waitFor(() => screen.getByText(/copy/i));
  expect(screen.getByText(/copy/i)).toBeInTheDocument();
});

test('Copies text to clipbard and displays success message', async () => {
  render(<CopyText textToCopy="Test">testing text</CopyText>);
  const user = userEvent.setup();

  let clipboard = '';

  // Mock navigator object
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: (val: string) => (clipboard = val),
    },
  });

  const wrapper = screen.getByText('testing text');
  await user.click(wrapper);

  expect(clipboard).toBe('Test');
  expect(screen.getByText(/copied!/i)).toBeInTheDocument();
});
