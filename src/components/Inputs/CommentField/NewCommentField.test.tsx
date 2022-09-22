import { render, screen, userEvent } from '../../../test-utils';
import NewCommentField from './NewCommentField';
import React from 'react';

test('Triggers publish on button press', async () => {
  let str = '';
  const handlePublish = (value: string) => {
    str = value;
  };
  const user = userEvent.setup();

  render(
    <NewCommentField
      defaultValue="I am comment"
      onPublish={handlePublish}
    ></NewCommentField>
  );

  const postButton = screen.getByRole('button');
  await user.click(postButton);

  expect(str).toBe('I am comment');
});

test('Triggers publish on enter press', async () => {
  let str = '';
  const handlePublish = (value: string) => {
    str = value;
  };
  const user = userEvent.setup();

  render(
    <NewCommentField
      defaultValue="I am comment"
      onPublish={handlePublish}
    ></NewCommentField>
  );

  const input = screen.getByRole('textbox');
  await user.type(input, '{Enter}');

  expect(str).toBe('I am comment');
});

test('Clears text on clear button pressed', async () => {
  const user = userEvent.setup();
  render(
    <NewCommentField
      defaultValue="I am comment"
      onPublish={() => undefined}
    ></NewCommentField>
  );

  const input = screen.getByRole('textbox') as HTMLTextAreaElement;
  const clear = screen.getByTestId('clearbutton');
  await user.click(clear);

  expect(input).toHaveValue('');
});
