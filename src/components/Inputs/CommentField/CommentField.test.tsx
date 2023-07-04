import { faker } from '@faker-js/faker';

import { act, render, screen, userEvent } from '../../../tests/test-utils';
import CommentField, { CommentFieldProps } from './CommentField';

function fakeProps(): CommentFieldProps {
  return {
    id: faker.string.uuid(),
    value: faker.lorem.words(faker.number.int({ min: 0, max: 5 })),
    onChange: vi.fn(),
    onDelete: vi.fn(),
  };
}

test('Works as expected when writing', async () => {
  const user = userEvent.setup();
  const props = fakeProps();
  render(<CommentField {...props} />);

  const textField = screen.getByRole('textbox');

  const randomText = faker.lorem.words(faker.number.int({ min: 1, max: 15 }));
  await user.clear(textField);
  await user.type(textField, randomText);

  // Wait for debounce
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 700);
    });
  });

  expect(props.onChange).toHaveBeenCalledWith(randomText);
});

test('Works as expected when clicking delete', async () => {
  const user = userEvent.setup();
  const props = fakeProps();
  render(<CommentField {...props} />);

  const deleteButton = screen.getByRole('button');

  await user.click(deleteButton);

  expect(props.onDelete).toHaveBeenCalledTimes(1);
});
