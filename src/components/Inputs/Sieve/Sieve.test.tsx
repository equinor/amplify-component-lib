import { MemoryRouter } from 'react-router';

import { faker } from '@faker-js/faker';

import {
  render,
  screen,
  userEvent,
  within,
  renderHook,
} from '../../../tests/test-utils';
import { FilterOption } from './Filter';
import Sieve, { SieveProps, SieveValue } from './Sieve';
import { Option } from './Sieve.common';
import { useSearchParams } from 'react-router-dom';

function Wrappers({ children }: { children: any }) {
  return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>;
}

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
  const sortOptions = fakeOptions();
  return {
    searchPlaceholder: faker.lorem.sentence(),
    sortOptions,
    filterOptions: fakeFilterOptions(),
    sieveValue: {
      searchValue: undefined,
      filterValues: undefined,
      sortValue: sortOptions[0],
    },
    onUpdate: vi.fn(),
  };
}

test('Users can search', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  let text = '';
  const customOnUpdate = (value: SieveValue) => {
    text += value.searchValue;
  };

  render(<Sieve {...props} onUpdate={customOnUpdate} />, { wrapper: Wrappers });

  const searchField = screen.getByRole('textbox');

  const fakeText = faker.animal.cetacean();
  await user.type(searchField, fakeText);

  expect(text).toBe(fakeText);
});

test('Users can clear search', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  const fakeText = faker.animal.cetacean();
  render(
    <Sieve
      {...props}
      sieveValue={{
        searchValue: fakeText,
        filterValues: undefined,
        sortValue: props.sortOptions?.at(0),
      }}
    />,
    { wrapper: Wrappers }
  );

  const searchField = screen.getByRole('textbox');

  await user.clear(searchField);

  expect(props.onUpdate).toHaveBeenCalledWith({
    searchValue: undefined,
    sortValue: props.sortOptions?.at(0),
  });
});

test('Users can sort', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />, { wrapper: Wrappers });

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

test('Sort by is hidden when sorting options = []', async () => {
  const props = fakeProps();
  render(<Sieve {...props} sortOptions={[]} />, { wrapper: Wrappers });

  const sortByButton = screen.queryByRole('button', {
    name: /sort by/i,
  });

  expect(sortByButton).not.toBeInTheDocument();
});

test('Users can open and close a filter group by clicking it twice', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />, { wrapper: Wrappers });

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

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
  render(<Sieve {...props} />, { wrapper: Wrappers });

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

  await user.click(document.body);

  for (const option of props.filterOptions?.[randomFilterGroup].options ?? []) {
    expect(screen.queryByText(option.label)).not.toBeInTheDocument();
  }
});

test('Users can filter', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Sieve {...props} />, { wrapper: Wrappers });

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
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props.filterOptions?.[randomFilterGroup].options[randomIndex],
      ],
    },
    sortValue: props.sortOptions?.at(0),
  });
});

test('Filter not shown if the options are empty', async () => {
  const props = fakeProps();
  render(<Sieve {...props} filterOptions={[]} />, { wrapper: Wrappers });

  const filterByButton = screen.queryByRole('button', {
    name: /filter by/i,
  });

  expect(filterByButton).not.toBeInTheDocument();
});

test('Users can remove filter by clicking it', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const randomIndex = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.[randomFilterGroup].options.length ?? 0) - 1,
  });

  render(
    <Sieve
      {...props}
      sieveValue={{
        ...props.sieveValue,
        filterValues: {
          [props.filterOptions![randomFilterGroup].label]: [
            props!.filterOptions![randomFilterGroup].options[randomIndex],
          ],
        },
      }}
    />,
    { wrapper: Wrappers }
  );

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup].label,
    })
  );

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup]?.options[randomIndex]
        ?.label,
    })
  );

  expect(props.onUpdate).toHaveBeenCalledWith({
    searchValue: undefined,
    filterValues: undefined,
    sortValue: props.sortOptions?.at(0),
  });
});

test('Sorting chip doesnt show when sortOptions arent provided', () => {
  const props = fakeProps();
  render(<Sieve {...props} sortOptions={undefined} />, { wrapper: Wrappers });

  expect(screen.queryByText(/'sort by'/i)).not.toBeInTheDocument();
});

test('Filtering chip doesnt show when filterOptions arent provided', () => {
  const props = fakeProps();
  render(<Sieve {...props} filterOptions={undefined} />, { wrapper: Wrappers });

  expect(screen.queryByText(/'filter by'/i)).not.toBeInTheDocument();
});

test('Users can remove filters', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const randomIndex = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.[randomFilterGroup].options.length ?? 0) - 1,
  });

  const sieveValue: SieveValue = {
    ...props.sieveValue,
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props!.filterOptions![randomFilterGroup].options[randomIndex],
      ],
    },
  };
  render(<Sieve {...props} sieveValue={sieveValue} />, { wrapper: Wrappers });

  await user.click(screen.getByRole('img', { name: /close/i }));

  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: undefined,
    sortValue: props.sortOptions?.at(0),
  });
});

test('Users can remove all filters', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const sieveValue: SieveValue = {
    ...props.sieveValue,
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props!.filterOptions![randomFilterGroup].options[0],
        props!.filterOptions![randomFilterGroup].options[1],
      ],
    },
  };
  render(<Sieve {...props} sieveValue={sieveValue} />, { wrapper: Wrappers });

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
  render(<Sieve {...props} showChips={false} />, { wrapper: Wrappers });

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

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
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props.filterOptions?.[randomFilterGroup].options[randomIndex],
      ],
    },
    sortValue: props.sortOptions?.at(0),
  });

  await user.click(filterByButton);

  const filterChips = screen.queryByText(
    props.filterOptions?.[randomFilterGroup]?.options[randomIndex]?.label ??
      'not-found'
  );

  expect(filterChips).not.toBeInTheDocument();
});

test('handleUpdateSieveValue updates the sieve value correctly', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  render(
    <Sieve
      {...props}
      sieveValue={{
        ...props.sieveValue,
        filterValues: {
          [props.filterOptions![randomFilterGroup].label]: [
            props!.filterOptions![randomFilterGroup].options[0],
          ],
        },
      }}
    />,
    { wrapper: Wrappers }
  );

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup].label,
    })
  );

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup]?.options[0]?.label,
    })
  );
  expect(props.onUpdate).toHaveBeenCalledWith({
    filterValues: undefined,
    sortValue: props.sortOptions?.at(0),
    searchValue: undefined,
  });
});

test('useEffect updates searchParams and calls onUpdate when conditions are met', async () => {
  const fakeText = faker.animal.cetacean();
  const props = {
    ...fakeProps(),
  };

  const user = userEvent.setup();
  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  render(
    <Sieve
      {...props}
      syncWithSearchParams={true}
      sieveValue={{
        ...props.sieveValue,
        filterValues: {
          [props.filterOptions![randomFilterGroup].label]: [
            props!.filterOptions![randomFilterGroup].options[0],
            props!.filterOptions![randomFilterGroup].options[1],
          ],
          [props.filterOptions![randomFilterGroup].label]: [],
        },
        sortValue: props.sortOptions?.at(0),
      }}
    />,
    { wrapper: Wrappers }
  );

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  expect(props.onUpdate).not.toHaveBeenCalledWith(
    expect.objectContaining({
      filterValues: {
        [props.filterOptions![randomFilterGroup].label]:
          props!.filterOptions![randomFilterGroup].options[0],
        filterOption2: expect.arrayContaining([]),
      },
      sortValue: props.sortOptions?.at(0),
      searchValue: fakeText,
    })
  );

  // URL searchPArams
  /* const searchParams = new URLSearchParams(global.window.location.search);

  const searchValue = searchParams.get('search');
  expect(searchValue).not.toBe(encodeURIComponent(fakeText));

  props.sieveValue = {
    ...props.sieveValue,
    searchValue: undefined as unknown as string,
  };

  render(<Sieve {...props} />, { wrapper: Wrappers });

  await user.click(filterByButton);

  // searchparams searchvalue
  if (props.sieveValue.searchValue) {
    expect(searchParams.get('search')).toBe(props.sieveValue.searchValue);
  } else {
    expect(searchParams.has('search')).toBe(false);
  } */

  /*   const filterValuesParams = new URLSearchParams(global.window.location.search)
  const filterValue = searchParams.get()
  expect(filterValue).not.toBe(encodeURIComponent())
 

  if (props.sieveValue.filterValues.filterOption1.length > 0) {
    expect(searchParams.getAll('filteroption1')).toBe(
      expect.arrayContaining([props.filterOptions![0].label])
    );
  } else {
    expect(searchParams.has('filteroption1')).toBe(false);
  } */

  /*   const selectedOptions = props.filterOptions
    ?.find((filterOption) => filterOption.label === 'filterOption1Label')
    ?.options.filter((option) =>
      searchParams.getAll('filteroption1').includes(option.label.toLowerCase())
    ) as Option[];

  expect(selectedOptions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        label: 'filterOption1Label',
        value: 'filterOption1Value',
      }),
    ])
  ); */
});

// ett som sätter sievalue och delete

// initaliserar från searhparams sievalue ¨r undefinde och searchparams.

test('Add and delete searchparams after what the user is choosing', async () => {
  const fakeText = faker.animal.cetacean();
  const props = {
    ...fakeProps(),
  };

  const randomFilterGroup = faker.datatype.number({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  let sieveValue: SieveValue = {
    ...props.sieveValue,
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props!.filterOptions![randomFilterGroup].options[0],
      ],
    },
    sortValue: props.sortOptions?.at(0),
    searchValue: fakeText,
  };

  const handleOnUpdate = (value: SieveValue) => {
    sieveValue = value;
  };

  const user = userEvent.setup();

  render(
    <Sieve
      {...props}
      syncWithSearchParams
      sieveValue={sieveValue}
      onUpdate={handleOnUpdate}
    />,
    {
      wrapper: Wrappers,
    }
  );

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  await user.click(filterByButton);

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup].label,
    })
  );

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[randomFilterGroup]?.options[0]?.label,
    })
  );

  render(<Sieve {...props} syncWithSearchParams sieveValue={sieveValue} />, {
    wrapper: Wrappers,
  });

  const { result } = renderHook(() => useSearchParams());

  const [searchParams] = result.current;

  console.log(searchParams);

  const filterValue = searchParams.get(
    props.filterOptions![randomFilterGroup].label
  );
  expect(filterValue).toBe(
    encodeURIComponent(props.filterOptions![randomFilterGroup].label)
  );

  const searchValue = searchParams.get('search');
  expect(searchValue).toBe(encodeURIComponent(fakeText));

  props.sieveValue = {
    ...props.sieveValue,
    searchValue: undefined as unknown as string,
  };

  render(<Sieve {...props} />, { wrapper: Wrappers });

  await user.click(filterByButton);

  // searchparams searchvalue
  if (props.sieveValue.searchValue) {
    expect(searchParams.get('search')).toBe(props.sieveValue.searchValue);
  } else {
    expect(searchParams.has('search')).toBe(false);
  }
});
