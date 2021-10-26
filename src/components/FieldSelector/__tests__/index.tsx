import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import FieldSelector, { FieldSelectorType } from '../index';

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

test('Renders', () => {
  const props = fakeProps();
  render(<FieldSelector {...props} />);
});

test('Runs onSelect function once when clicking an item', () => {
  const props = fakeProps();
  render(<FieldSelector {...props} />);

  const secondItem = screen.getByText(props.availableFields[1].name);
  userEvent.click(secondItem);

  expect(props.onSelect).toHaveBeenCalledWith(props.availableFields[1]);
  expect(props.onSelect).toHaveBeenCalledTimes(1);
});

test('Doesnt run onSelect function when clicking already selected item', () => {
  const props = fakeProps();
  render(<FieldSelector {...props} />);

  const selected = screen.getByText(props.currentField.name);
  userEvent.click(selected);
  expect(props.onSelect).toHaveBeenCalledTimes(0);
});
