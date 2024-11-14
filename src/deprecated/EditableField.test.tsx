import React from 'react';

import { faker } from '@faker-js/faker';

import EditableField from 'src/deprecated/EditableField';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('renders textbox', async () => {
  render(<EditableField editable={true} value="Test"></EditableField>);
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: /test/i }));

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders child', () => {
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
  const startText = faker.animal.dog();
  render(
    <EditableField
      editable={true}
      onChange={cb}
      value={startText}
    ></EditableField>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: startText }));

  const textbox = screen.getByRole('textbox');

  const typingText = faker.animal.dog();

  await user.type(textbox, typingText);
  expect(textbox.value).toBe(startText + typingText);
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
  const startText = faker.animal.dog();
  const cb = vi.fn();
  render(
    <EditableField
      editable={true}
      onChange={cb}
      value={startText}
    ></EditableField>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('heading', { name: startText }));

  const textbox = screen.getByRole('textbox');

  const typingText = faker.animal.dog();

  await user.type(textbox, typingText);
  await user.click(document.body);

  expect(cb).toHaveBeenCalled();
  expect(
    screen.getByRole('heading', { name: startText + typingText })
  ).toBeInTheDocument();
});
