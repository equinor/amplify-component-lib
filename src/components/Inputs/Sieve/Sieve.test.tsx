import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../test-utils';
import { FilterOption } from './Filter';
import Sieve, { Option, SieveProps } from './Sieve';

function fakeOption(): Option {
  return {
    label: faker.animal.fish(),
    value: faker.datatype.uuid(),
  };
}

function fakeOptions(): Option[] {
  const options: Option[] = [];

  for (let i = 0; i < faker.datatype.number({ min: 2, max: 5 }); i++) {
    options.push(fakeOption());
  }
  return options;
}

function fakeFilterOptions(): FilterOption[] {
  const options: FilterOption[] = [];
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 5 }); i++) {
    options.push({
      label: faker.animal.dog(),
      options: fakeOptions(),
    });
  }
  return options;
}

function fakeProps(): SieveProps {
  return {
    searchPlaceholder: faker.lorem.sentence(),
    sortOptions: fakeOptions(),
    filterOptions: fakeFilterOptions(),
    onUpdate: jest.fn(),
  };
}

test('Users can search', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const searchField = screen.getByRole('textbox');

  const fakeText = faker.animal.cetacean();
  await user.type(searchField, fakeText);

  expect(props.onUpdate).toHaveBeenCalledWith({
    searchValue: fakeText,
    sortValue: props.sortOptions.at(0),
  });
});

test('Users can sort', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const sortByButton = screen.getByRole('button', {
    name: /sort by/i,
  });

  expect(
    screen.queryByText(props.sortOptions[0].label)
  ).not.toBeInTheDocument();

  await user.click(sortByButton);

  for (const option of props.sortOptions) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomIndex = faker.datatype.number({
    min: 1,
    max: props.sortOptions.length - 1,
  });
  await user.click(
    screen.getByRole('menuitem', { name: props.sortOptions[randomIndex].label })
  );

  expect(props.onUpdate).toHaveBeenCalledWith({
    sortValue: props.sortOptions[randomIndex],
  });
});

test('Users can filter', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  expect(
    screen.queryByText(props.sortOptions[0].label)
  ).not.toBeInTheDocument();

  await user.click(filterByButton);

  for (const option of props.filterOptions) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: props.filterOptions.length - 1,
  });

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions[randomFilterGroup].label,
    })
  );

  for (const option of props.filterOptions[randomFilterGroup].options) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomIndex = faker.datatype.number({
    min: 0,
    max: props.filterOptions[randomFilterGroup].options.length - 1,
  });
  await user.click(
    screen.getByText(
      props.filterOptions[randomFilterGroup].options[randomIndex].label
    )
  );

  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: [props.filterOptions[randomFilterGroup].options[randomIndex]],
    sortValue: props.sortOptions.at(0),
  });
});
