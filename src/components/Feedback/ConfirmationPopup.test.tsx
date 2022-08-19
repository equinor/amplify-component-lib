import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '../../test-utils';

import { Button } from '@equinor/eds-core-react';
import ConfirmationPopup from './ConfirmationPopup';
import React from 'react';
import { screen } from '@testing-library/dom';

test('renders when show is true', () => {
  render(<ConfirmationPopup show={true}>content</ConfirmationPopup>);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('renders title when value is given', () => {
  const title = 'Alec Trevelyan';
  const { getByText } = render(
    <ConfirmationPopup show={true} title={title}>
      content
    </ConfirmationPopup>
  );
  expect(getByText(title).innerHTML).toBe(title);
});

test('renders body when value is given', () => {
  const body = 'This is a popup body';
  const { getByText } = render(
    <ConfirmationPopup show={true} body={body}>
      content
    </ConfirmationPopup>
  );
  expect(getByText(body).innerHTML).toBe(body);
});

test('renders buttons when value is given', () => {
  const buttons = [
    <Button key="cancel" variant="ghost" onClick={undefined}>
      Cancel
    </Button>,
    <Button key="ok" variant="ghost" color="danger" onClick={undefined}>
      Ok
    </Button>,
  ];
  const { getByText } = render(
    <ConfirmationPopup show={true} actions={buttons}>
      content
    </ConfirmationPopup>
  );
  expect(getByText('Cancel')).toBeInTheDocument();
  expect(getByText('Ok')).toBeInTheDocument();
});

test('triggers callback functions on actions given', () => {
  const cb = jest.fn();

  const buttons = [
    <Button key="cancel" variant="ghost" onClick={cb}>
      Cancel
    </Button>,
    <Button key="ok" variant="ghost" color="danger" onClick={cb}>
      Ok
    </Button>,
  ];
  const { getByText } = render(
    <ConfirmationPopup show={true} actions={buttons}>
      content
    </ConfirmationPopup>
  );

  fireEvent.click(getByText('Cancel'));
  expect(cb).toHaveBeenCalledTimes(1);
  fireEvent.click(getByText('Ok'));
  expect(cb).toHaveBeenCalledTimes(2);
});
