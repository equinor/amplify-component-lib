import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import EditableTextEntry, { EditableTextEntryProps } from './EditableTextEntry';

function fakeProps(): EditableTextEntryProps {
  return {
    id: faker.datatype.uuid(),
    body: faker.lorem.word(),
    onSave: vi.fn(),
    onDelete: vi.fn(),
  };
}

test('Works as expected when clicking edit, changing text and saving', async () => {
  const props = fakeProps();
  render(<EditableTextEntry {...props} />);
  const user = userEvent.setup();

  const text = screen.getByText(props.body);

  await user.click(text);

  const textField = screen.getByRole('textbox');

  const newRandomText = faker.lorem.sentences(2);
  await user.clear(textField);
  await user.type(textField, newRandomText);

  const finishButton = screen.getByRole('button', { name: /finish/i });

  await user.click(finishButton);
  expect(props.onSave).toHaveBeenCalledTimes(1);
  expect(props.onSave).toHaveBeenCalledWith(newRandomText);
});

test('Works as expected when clicking edit and then canceling', async () => {
  const props = fakeProps();
  render(<EditableTextEntry {...props} />);
  const user = userEvent.setup();

  const text = screen.getByText(props.body);

  await user.click(text);

  const textField = screen.getByRole('textbox');

  const newRandomText = faker.lorem.sentences(2);
  await user.clear(textField);
  await user.type(textField, newRandomText);

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  await user.click(cancelButton);
  expect(screen.getByText(props.body)).toBeInTheDocument();
  expect(screen.queryByText(newRandomText)).not.toBeInTheDocument();
});

test('Works as expected when clicking delete', async () => {
  const props = fakeProps();
  render(<EditableTextEntry {...props} />);
  const user = userEvent.setup();

  const text = screen.getByText(props.body);

  await user.click(text);

  const deleteButton = screen.getByRole('button', { name: /delete/i });

  await user.click(deleteButton);
  expect(props.onDelete).toHaveBeenCalledTimes(1);
});
