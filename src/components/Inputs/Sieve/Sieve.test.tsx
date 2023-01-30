import { faker } from '@faker-js/faker';

import { render, screen, userEvent, vi } from '../../../test-utils';
import { FilterOption } from './Filter';
import Sieve, { SieveProps } from './Sieve';
import { Option } from './Sieve.common';

function fakeOption(): Option {
  return {
    label: faker.datatype.uuid(),
    value: faker.datatype.uuid(),
  };
}

function fakeOptions(): Option[] {
  const options: Option[] = [];

  for (let i = 0; i < faker.datatype.number({ min: 2, max: 6 }); i++) {
    options.push(fakeOption());
  }
  return options;
}

function fakeFilterOptions(): FilterOption[] {
  const options: FilterOption[] = [];
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 7 }); i++) {
    options.push({
      label: faker.datatype.uuid(),
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
    onUpdate: vi.fn(),
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
    sortValue: props.sortOptions?.at(0),
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
    screen.queryByText(props.sortOptions?.[0].label ?? 'not-found')
  ).not.toBeInTheDocument();

  await user.click(sortByButton);

  for (const option of props?.sortOptions ?? []) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomIndex = faker.datatype.number({
    min: 1,
    max: (props.sortOptions?.length ?? 0) - 1,
  });
  await user.click(
    screen.getByRole('menuitem', {
      name: props.sortOptions?.[randomIndex].label,
    })
  );

  expect(props.onUpdate).toHaveBeenCalledWith({
    sortValue: props.sortOptions?.[randomIndex],
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
    screen.queryByText(props.sortOptions?.[0].label ?? 'not-found')
  ).not.toBeInTheDocument();

  await user.click(filterByButton);

  for (const option of props?.filterOptions ?? []) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup].label,
    })
  );

  for (const option of props.filterOptions?.[randomFilterGroup].options ?? []) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomIndex = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.[randomFilterGroup].options.length ?? 0) - 1,
  });
  await user.click(
    screen.getByText(
      props.filterOptions?.[randomFilterGroup]?.options[randomIndex]?.label ??
        'not-found'
    )
  );

  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: [
      props.filterOptions?.[randomFilterGroup].options[randomIndex],
    ],
    sortValue: props.sortOptions?.at(0),
  });
});

test('Sorting chip doesnt show when sortOptions arent provided', () => {
  const props = fakeProps();
  render(<Sieve {...props} sortOptions={undefined} />);

  expect(screen.queryByText(/'sort by'/i)).not.toBeInTheDocument();
});

test('Filtering chip doesnt show when filterOptions arent provided', () => {
  const props = fakeProps();
  render(<Sieve {...props} filterOptions={undefined} />);

  expect(screen.queryByText(/'filter by'/i)).not.toBeInTheDocument();
});
