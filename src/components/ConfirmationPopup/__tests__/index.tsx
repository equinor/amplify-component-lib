import React from 'react';
import { render, cleanup, fireEvent } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationPopup from '../index';
import { Button } from '@equinor/eds-core-react';
import { screen } from '@testing-library/dom';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<ConfirmationPopup show={true}></ConfirmationPopup>);
});

test('renders when show is true', () => {
  render(<ConfirmationPopup show={true} />);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('renders title when value is given', () => {
  const title = 'Alec Trevelyan';
  const { getByText } = render(<ConfirmationPopup show={true} title={title} />);
  expect(getByText(title).innerHTML).toBe(title);
});

test('renders body when value is given', () => {
  const body = 'This is a popup body';
  const { getByText } = render(<ConfirmationPopup show={true} body={body} />);
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
    <ConfirmationPopup show={true} actions={buttons} />
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
    <ConfirmationPopup show={true} actions={buttons} />
  );

  fireEvent.click(getByText('Cancel'));
  expect(cb).toHaveBeenCalledTimes(1);
  fireEvent.click(getByText('Ok'));
  expect(cb).toHaveBeenCalledTimes(2);
});
