import React from 'react';
import { render, fireEvent, screen, userEvent } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import EditableField from '../index';

test('renders without crashing', () => {
  render(<EditableField editable={true} value="Test"></EditableField>);
});

test('renders textbox when clicked', () => {
  render(<EditableField editable={true} value="Test"></EditableField>);

  fireEvent.click(screen.getByRole('heading', { name: /test/i }));

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders textbox when clicked', () => {
  const cb = jest.fn();
  render(
    <EditableField editable={true} onChange={cb} value="Test"></EditableField>
  );

  fireEvent.click(screen.getByRole('heading', { name: /test/i }));

  const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;
  textbox.value = '';

  userEvent.type(textbox, 'A new test');
  expect(textbox).toHaveValue('A new test');
});

test('Returns to display mode with onchange after write and deselect', () => {
  const cb = jest.fn();
  render(
    <EditableField editable={true} onChange={cb} value="Test"></EditableField>
  );

  userEvent.click(screen.getByRole('heading', { name: /test/i }));

  const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;
  textbox.value = '';

  userEvent.type(textbox, 'A new test');
  userEvent.click(document.body);

  expect(cb).toHaveBeenCalled();
  expect(
    screen.getByRole('heading', { name: /A new test/i })
  ).toBeInTheDocument();
});
