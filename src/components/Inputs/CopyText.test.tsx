import { waitFor } from '@testing-library/react';

import { render, screen, userEvent } from '../../test-utils';
import CopyText from './CopyText';

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
