import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen, userEvent } from '../../test-utils';

import EditableField from '.';
import React from 'react';

test('renders without crashing', () => {
  render(<EditableField editable={true} value="Test"></EditableField>);
});

test('renders textbox when clicked', () => {
  render(<EditableField editable={true} value="Test"></EditableField>);

  fireEvent.click(screen.getByRole('heading', { name: /test/i }));

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders textbox when clicked', async () => {
  const cb = jest.fn();
  render(
    <EditableField editable={true} onChange={cb} value="Test"></EditableField>
  );
  const user = userEvent.setup();

  fireEvent.click(screen.getByRole('heading', { name: /test/i }));

  const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;
  textbox.value = '';

  await user.type(textbox, 'A new test');
  expect(textbox.value).toBe('A new test');
});

test('Returns to display mode with onchange after write and deselect', async () => {
  const cb = jest.fn();
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
