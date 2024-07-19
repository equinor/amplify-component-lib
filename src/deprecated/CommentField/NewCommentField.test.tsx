import React from 'react';

import { faker } from '@faker-js/faker';

import NewCommentField from 'src/deprecated/CommentField/NewCommentField';
import { render, screen, userEvent } from 'src/tests/test-utils';

test('Triggers publish on button press', async () => {
  const defaultValue = faker.animal.dog();
  const handlePublish = vi.fn();

  const user = userEvent.setup();

  render(
    <NewCommentField defaultValue={defaultValue} onPublish={handlePublish} />
  );

  const postButton = screen.getByRole('button');
  await user.click(postButton);

  expect(handlePublish).toHaveBeenCalledWith(defaultValue);
});

test('Triggers publish on enter press', async () => {
  const onPublish = vi.fn();
  const defaultValue = faker.animal.dog();

  render(<NewCommentField defaultValue={defaultValue} onPublish={onPublish} />);
  const user = userEvent.setup();

  const input = screen.getByRole('textbox');
  await user.type(input, '{Enter}');

  expect(onPublish).toHaveBeenCalledWith(defaultValue);
});

test('Clears text on clear button pressed', async () => {
  const user = userEvent.setup();
  const onPublish = vi.fn();
  const defaultValue = faker.animal.dog();
  render(<NewCommentField defaultValue={defaultValue} onPublish={onPublish} />);

  const clearButton = screen.getByTestId('clear-button');
  await user.click(clearButton);

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});

test('Not providing defaultValue prop works as expected', async () => {
  const onPublish = vi.fn();
  render(<NewCommentField onPublish={onPublish} />);
  const user = userEvent.setup();

  const input = screen.getByRole('textbox');
  await user.type(input, '{Enter}');

  expect(input).toHaveValue('');
  expect(onPublish).not.toHaveBeenCalledWith('');
});

test('Typing works as expected', async () => {
  const onPublish = vi.fn();
  render(<NewCommentField onPublish={onPublish} />);
  const user = userEvent.setup();

  const input = screen.getByRole('textbox');
  const text = faker.animal.bird();

  await user.type(input, text);
  expect(input).toHaveValue(text);
});
