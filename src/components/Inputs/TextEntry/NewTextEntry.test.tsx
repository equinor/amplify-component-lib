import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../test-utils';
import NewTextEntry, { NewTextEntryProps } from './NewTextEntry';

function fakeProps(): NewTextEntryProps {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.word(),
    onSave: jest.fn(),
  };
}

test('Works as expected with writing and saving', async () => {
  const props = fakeProps();
  render(<NewTextEntry {...props} />);
  const user = userEvent.setup();

  const newButton = screen.getByRole('button', {
    name: 'New ' + props.title,
  });

  await user.click(newButton);

  const textField = screen.getByRole('textbox');

  const randomText = faker.lorem.sentences(2);

  await user.type(textField, randomText);

  const finishButton = screen.getByRole('button', {
    name: 'Finish',
  });

  await user.click(finishButton);

  expect(props.onSave).toHaveBeenCalledTimes(1);
  expect(props.onSave).toHaveBeenCalledWith(randomText);
});
