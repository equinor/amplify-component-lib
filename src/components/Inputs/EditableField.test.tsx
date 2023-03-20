import React from 'react';

import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../tests/test-utils';
import EditableField from './EditableField';

test('renders textbox', async () => {
  render(<EditableField editable={true} value="Test"></EditableField>);
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: /test/i }));

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders child', async () => {
  const text = faker.animal.dog();
  render(
    <EditableField editable={true} value="Test">
      <p>{text}</p>
    </EditableField>
  );

  expect(screen.getByText(text)).toBeInTheDocument();
});

test('renders inputField when given', async () => {
  const text = faker.animal.dog();
  render(
    <EditableField
      editable={true}
      value="Test"
      inputField={<input type="text" placeholder={text} />}
    ></EditableField>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: /test/i }));

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', text);
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

test('Closes textbox if editable is false', async () => {
  const { rerender } = render(
    <EditableField editable={true} value="Test"></EditableField>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: /test/i }));

  expect(screen.getByRole('textbox')).toBeInTheDocument();

  rerender(<EditableField editable={false} value="Test"></EditableField>);

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
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
