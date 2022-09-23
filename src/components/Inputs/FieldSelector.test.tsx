import FieldSelector, { FieldSelectorType } from './FieldSelector';
import { render, screen, userEvent } from '../../test-utils';

import { faker } from '@faker-js/faker';

function fakeField() {
  return {
    name: faker.name.firstName(),
    guid: faker.datatype.uuid(),
    country: faker.address.country(),
  };
}

function fakeProps(): FieldSelectorType {
  const fields = new Array(5).fill(0).map(() => fakeField());
  return {
    currentField: fields[0],
    availableFields: fields,
    onSelect: jest.fn(),
  };
}

test('Runs onSelect function once when clicking an item', async () => {
  const props = fakeProps();
  render(<FieldSelector {...props} />);
  const user = userEvent.setup();

  const secondItem = screen.getByText(
    new RegExp(props.availableFields[1].name, 'i')
  );
  await user.click(secondItem);

  expect(props.onSelect).toHaveBeenCalledWith(props.availableFields[1]);
  expect(props.onSelect).toHaveBeenCalledTimes(1);
});

test('Doesnt run onSelect function when clicking already selected item', async () => {
  const props = fakeProps();
  render(<FieldSelector {...props} />);
  const user = userEvent.setup();

  const currentFieldName = props?.currentField?.name ?? 'name';
  const selected = screen.getByText(new RegExp(currentFieldName, 'i'));
  await user.click(selected);
  expect(props.onSelect).toHaveBeenCalledTimes(0);
});
