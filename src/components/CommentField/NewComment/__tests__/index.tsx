import React from 'react';
import { render, fireEvent, screen, cleanup } from '../../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import NewCommentField from '../index';
import { getByRole, waitFor } from '@testing-library/react';

afterEach(cleanup);

describe('NewCommentField', () => {
  it('renders without crashing', () => {
    render(<NewCommentField onPublish={() => undefined}></NewCommentField>);
  });

  it('Triggers publish on button press', async () => {
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

  it('Triggers publish on enter press', async () => {
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

  it('Clears text on clear button pressed', async () => {
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
});
