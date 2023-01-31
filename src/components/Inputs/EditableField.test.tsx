import React from 'react';

import { render, screen, userEvent, vi } from '../../test-utils';
import EditableField from './EditableField';

test('renders textbox', async () => {
  render(<EditableField editable={true} value="Test"></EditableField>);
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: /test/i }));

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders textbox when clicked', async () => {
  const cb = vi.fn();
  render(
    <EditableField editable={true} onChange={cb} value="Test"></EditableField>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: /test/i }));

  const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;
  textbox.value = '';

  await user.type(textbox, 'A new test');
  expect(textbox.value).toBe('A new test');
});

test('Returns to display mode with onchange after write and deselect', async () => {
  const cb = vi.fn();
  render(
    <EditableField editable={true} onChange={cb} value="Test"></EditableField>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: /test/i }));

  const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;
  textbox.value = '';

  await user.type(textbox, 'A new test');
  await user.click(document.body);

  expect(cb).toHaveBeenCalled();
  expect(
    screen.getByRole('heading', { name: /A new test/i })
  ).toBeInTheDocument();
});
