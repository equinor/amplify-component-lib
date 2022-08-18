import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '../../../test-utils';

import NewCommentField from './NewCommentField';
import React from 'react';

test('Triggers publish on button press', async () => {
  let str = '';
  const handlePublish = (value: string) => {
    str = value;
  };

  render(
    <NewCommentField
      defaultValue="I am comment"
      onPublish={handlePublish}
    ></NewCommentField>
  );

  const postButton = screen.getByRole('button');
  fireEvent.click(postButton);

  expect(str).toBe('I am comment');
});

test('Triggers publish on enter press', async () => {
  let str = '';
  const handlePublish = (value: string) => {
    str = value;
  };

  render(
    <NewCommentField
      defaultValue="I am comment"
      onPublish={handlePublish}
    ></NewCommentField>
  );

  const input = screen.getByRole('textbox');
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(str).toBe('I am comment');
});

test('Clears text on clear button pressed', async () => {
  render(
    <NewCommentField
      defaultValue="I am comment"
      onPublish={() => undefined}
    ></NewCommentField>
  );

  const input = screen.getByRole('textbox') as HTMLTextAreaElement;
  const clear = screen.getByTestId('clearbutton');
  fireEvent.click(clear);

  expect(input).toHaveValue('');
});
