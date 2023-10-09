import React from 'react';

import { Button } from '@equinor/eds-core-react';

import { render, screen, userEvent } from '../../tests/test-utils';
import ConfirmationPopup from './ConfirmationPopup';

test('renders when show is true', () => {
  render(<ConfirmationPopup show={true}>content</ConfirmationPopup>);
  expect(screen.getByTestId('dialog-header')).toBeInTheDocument();
});

test('renders title when value is given', () => {
  const title = 'Alec Trevelyan';
  render(
    <ConfirmationPopup show={true} title={title}>
      content
    </ConfirmationPopup>
  );
  expect(screen.getByTestId('dialog-header')).toHaveTextContent(title);
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

test('triggers callback functions on actions given', async () => {
  const cb = vi.fn();

  const buttons = [
    <Button key="cancel" variant="ghost" onClick={cb}>
      Cancel
    </Button>,
    <Button key="ok" variant="ghost" color="danger" onClick={cb}>
      Ok
    </Button>,
  ];
  const user = userEvent.setup();
  const { getByText } = render(
    <ConfirmationPopup show={true} actions={buttons}>
      content
    </ConfirmationPopup>
  );

  await user.click(getByText('Cancel'));
  expect(cb).toHaveBeenCalledTimes(1);
  await user.click(getByText('Ok'));
  expect(cb).toHaveBeenCalledTimes(2);
});

test('No element is shown when show=false', () => {
  render(<ConfirmationPopup show={false} />);
  expect(screen.queryByTestId('dialog-header')).not.toBeInTheDocument();
});

test('Places actions correctly when given actionPosition prop', () => {
  const buttons = [
    <Button key="cancel" variant="ghost" onClick={undefined}>
      Cancel
    </Button>,
    <Button key="ok" variant="ghost" color="danger" onClick={undefined}>
      Ok
    </Button>,
  ];
  const actionPositions = [undefined, 'left', 'right'] as [
    undefined,
    'left',
    'right',
  ];
  const { rerender } = render(
    <ConfirmationPopup show={true} actions={buttons}>
      content
    </ConfirmationPopup>
  );

  for (const position of actionPositions) {
    rerender(
      <ConfirmationPopup
        show={true}
        actions={buttons}
        actionPosition={position}
      >
        content
      </ConfirmationPopup>
    );
    const expectedId = `confirmation-actions-${position ?? 'right'}`;
    expect(screen.getByTestId(expectedId)).toBeInTheDocument();
  }
});
