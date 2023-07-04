import { faker } from '@faker-js/faker';

import { render, screen, userEvent, within } from '../../../tests/test-utils';
import { FilterOption } from './Filter';
import Sieve, { SieveProps } from './Sieve';
import { Option } from './Sieve.common';

function fakeOption(): Option {
  return {
    label: faker.string.uuid(),
    value: faker.string.uuid(),
  };
}

function fakeOptions(): Option[] {
  const options: Option[] = [];

  for (let i = 0; i < faker.number.int({ min: 2, max: 6 }); i++) {
    options.push(fakeOption());
  }
  return options;
}

function fakeFilterOptions(): FilterOption[] {
  const options: FilterOption[] = [];
  for (let i = 0; i < faker.number.int({ min: 1, max: 7 }); i++) {
    options.push({
      label: faker.string.uuid(),
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

test('Users can clear search', async () => {
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

  await user.clear(searchField);

  expect(props.onUpdate).toHaveBeenCalledWith({
    searchValue: undefined,
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

  const randomIndex = faker.number.int({
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

test('Sort by is hidden when sorting options = []', async () => {
  const props = fakeProps();
  render(<Sieve {...props} sortOptions={[]} />);

  const sortByButton = screen.queryByRole('button', {
    name: /sort by/i,
  });

  expect(sortByButton).not.toBeInTheDocument();
});

test('Users can open and close a filter group by clicking it twice', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  for (const option of props?.filterOptions ?? []) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomFilterGroup = faker.number.int({
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

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup].label,
    })
  );

  for (const option of props.filterOptions?.[randomFilterGroup].options ?? []) {
    expect(screen.queryByText(option.label)).not.toBeInTheDocument();
  }
});

test('UseOutsideClick works as expected', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  for (const option of props?.filterOptions ?? []) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  // Clicking outside and subMenu is still closed
  await user.click(document.body);

  for (const option of props?.filterOptions ?? []) {
    expect(screen.queryByText(option.label)).not.toBeInTheDocument();
  }

  await user.click(filterByButton);

  const randomFilterGroup = faker.number.int({
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

  await user.click(document.body);

  for (const option of props.filterOptions?.[randomFilterGroup].options ?? []) {
    expect(screen.queryByText(option.label)).not.toBeInTheDocument();
  }
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

  const randomFilterGroup = faker.number.int({
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

  const randomIndex = faker.number.int({
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

test('Filter not shown if the options are empty', async () => {
  const props = fakeProps();
  render(<Sieve {...props} filterOptions={[]} />);

  const filterByButton = screen.queryByRole('button', {
    name: /filter by/i,
  });

  expect(filterByButton).not.toBeInTheDocument();
});

test('Users can remove filter by clicking it twice', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup].label,
    })
  );

  const randomIndex = faker.number.int({
    min: 0,
    max: (props.filterOptions?.[randomFilterGroup].options.length ?? 0) - 1,
  });

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup]?.options[randomIndex]
        ?.label,
    })
  );

  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: [
      props.filterOptions?.[randomFilterGroup].options[randomIndex],
    ],
    sortValue: props.sortOptions?.at(0),
  });

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup]?.options[randomIndex]
        ?.label,
    })
  );

  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: undefined,
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

test('Users can remove filters', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup].label,
    })
  );

  const randomIndex = faker.number.int({
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

  await user.click(screen.getByRole('img', { name: /close/i }));

  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: undefined,
    sortValue: props.sortOptions?.at(0),
  });
});

test('Users can remove all filters', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />);

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);
  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[0].label,
    })
  );

  for (const i of [0, 1]) {
    await user.click(
      screen.getByText(
        props.filterOptions?.[0]?.options[i]?.label ?? 'not-found'
      )
    );
  }

  const removeAll = screen.getByText(/remove all/i);
  const removeAllIcon = within(removeAll).getByRole('img', { name: /close/i });

  await user.click(removeAllIcon);

  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: undefined,
    sortValue: props.sortOptions?.at(0),
  });
});

test('Do not show filter chips when showChips is set to false', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} showChips={false} />);

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  for (const option of props?.filterOptions ?? []) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }

  const randomFilterGroup = faker.number.int({
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

  const randomIndex = faker.number.int({
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

  await user.click(filterByButton);

  const filterChips = screen.queryByText(
    props.filterOptions?.[randomFilterGroup]?.options[randomIndex]?.label ??
      'not-found'
  );

  expect(filterChips).not.toBeInTheDocument();
});
