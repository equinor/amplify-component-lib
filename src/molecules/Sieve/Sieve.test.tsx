import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/react';

import { SieveFilterGroup } from 'src/molecules/Sieve/Filter';
import { Sieve } from 'src/molecules/Sieve/Sieve';
import {
  SieveOption,
  SieveProps,
  SieveValue,
} from 'src/molecules/Sieve/Sieve.types';
import { render, screen, userEvent, within } from 'src/tests/test-utils';

function Wrappers({ children }: { children: ReactNode }) {
  return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>;
}

function fakeOption(num: number): SieveOption {
  return {
    label: faker.string.uuid() + num,
    value: faker.string.uuid() + num,
  };
}

function fakeOptions(): SieveOption[] {
  const options: SieveOption[] = [];

  for (let i = 0; i < faker.number.int({ min: 2, max: 6 }); i++) {
    const option = fakeOption(i);
    options.push(option);
  }
  return options;
}

function fakeFilterOptions(): SieveFilterGroup[] {
  const options: SieveFilterGroup[] = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 7 }); i++) {
    options.push({
      label: faker.string.uuid(),
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

test('Sort by is hidden when sorting options = []', () => {
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
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props.filterOptions?.[randomFilterGroup].options[randomIndex],
      ],
    },
    sortValue: props.sortOptions?.at(0),
  });
});

test('Users can add multiple filters from the same filter menu', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const { rerender } = render(<Sieve {...props} />, { wrapper: Wrappers });

  const filterByButton = screen.getByRole('button', {
    name: /filter by/i,
  });

  expect(
    screen.queryByText(props.sortOptions?.[0].label ?? 'not-found')
  ).not.toBeInTheDocument();

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

  let called = 1;

  const options = props.filterOptions![randomFilterGroup].options;

  for (const [index, option] of options.entries()) {
    const selectedFilters = options.slice(0, index + 1);
    await user.click(screen.getByText(option.label));

    expect(props.onUpdate).toHaveBeenCalledWith({
      ...props.sieveValue,
      filterValues: {
        [props.filterOptions![randomFilterGroup].label]: selectedFilters,
      },
    });
    expect(props.onUpdate).toHaveBeenCalledTimes(called);
    called += 1;

    rerender(
      <Sieve
        {...props}
        sieveValue={{
          ...props.sieveValue,
          filterValues: {
            [props.filterOptions![randomFilterGroup].label]: selectedFilters,
          },
        }}
      />
    );
  }
});

test('Filter not shown if the options are empty', () => {
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

  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const randomIndex = faker.number.int({
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
            props.filterOptions![randomFilterGroup].options[randomIndex],
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

test('Removing the last filter in a filter group works as expected (from menu)', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  render(
    <Sieve
      {...props}
      sieveValue={{
        ...props.sieveValue,
        filterValues: {
          [props.filterOptions![0].label]: [props.filterOptions![0].options[0]],
          [props.filterOptions![1].label]: [props.filterOptions![1].options[0]],
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
      name: props.filterOptions?.[1].label,
    })
  );

  await user.click(
    screen.getByRole('menuitem', {
      name: props.filterOptions?.[1]?.options[0]?.label,
    })
  );

  // Expecting filter group that doesn't have any items to not be in the filterValues
  expect(props.onUpdate).toHaveBeenCalledWith({
    searchValue: undefined,
    filterValues: {
      [props.filterOptions![0].label]: [props.filterOptions![0].options[0]],
    },
    sortValue: props.sortOptions?.at(0),
  });
});

test('Removing the last filter in a filter group works as expected (from chip)', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  render(
    <Sieve
      {...props}
      sieveValue={{
        ...props.sieveValue,
        filterValues: {
          [props.filterOptions![0].label]: [props.filterOptions![0].options[0]],
          [props.filterOptions![1].label]: [props.filterOptions![1].options[0]],
        },
      }}
    />,
    { wrapper: Wrappers }
  );

  const optionChipClose = within(
    screen.getByText(props.filterOptions![1].options[0].label)
  ).getByRole('img', { name: /close/i });

  await user.click(optionChipClose);

  // Expecting filter group that doesn't have any items to not be in the filterValues
  expect(props.onUpdate).toHaveBeenCalledWith({
    searchValue: undefined,
    filterValues: {
      [props.filterOptions![0].label]: [props.filterOptions![0].options[0]],
    },
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
  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const randomIndex = faker.number.int({
    min: 0,
    max: (props.filterOptions?.[randomFilterGroup].options.length ?? 0) - 1,
  });

  const sieveValue: SieveValue = {
    ...props.sieveValue,
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props.filterOptions![randomFilterGroup].options[randomIndex],
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
  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const sieveValue: SieveValue = {
    ...props.sieveValue,
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props.filterOptions![randomFilterGroup].options[0],
        props.filterOptions![randomFilterGroup].options[1],
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

  const randomFilterGroup = faker.number.int({
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
            props.filterOptions![randomFilterGroup].options[0],
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

test('Add search params after what the user is choosing', async () => {
  const props = {
    ...fakeProps(),
  };
  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const user = userEvent.setup();

  let router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Sieve {...props} syncWithSearchParams />,
      },
    ],
    {
      initialEntries: ['/'],
      initialIndex: 0,
    }
  );

  const { rerender } = render(<RouterProvider router={router} />);

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
    searchValue: undefined,
    filterValues: {
      [props.filterOptions![randomFilterGroup].label]: [
        props.filterOptions![randomFilterGroup].options[0],
      ],
    },
    sortValue: props.sortOptions![0],
  });

  const fakeText = faker.animal.cetacean();

  await user.type(screen.getByRole('textbox'), fakeText);

  router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <Sieve
            {...props}
            sieveValue={{
              ...props.sieveValue,
              searchValue: fakeText,
              filterValues: {
                [props.filterOptions![randomFilterGroup].label]: [
                  props.filterOptions![randomFilterGroup].options[0],
                ],
              },
            }}
            syncWithSearchParams
          />
        ),
      },
    ],
    {
      initialEntries: ['/'],
      initialIndex: 0,
    }
  );

  rerender(<RouterProvider router={router} />);

  await waitFor(() => {
    const searchParams = new URLSearchParams(router.state.location.search);
    expect(searchParams).not.toBeNull();
  });

  const searchParams = new URLSearchParams(router.state.location.search);

  const filterValue = searchParams.get(
    props.filterOptions![randomFilterGroup].label
  );
  expect(filterValue).toBe(
    JSON.stringify([props.filterOptions![randomFilterGroup].options[0].label])
  );

  const searchValue = searchParams.get('search');
  expect(searchValue).toBe(fakeText);
});

test('Init of search params works with "bad" search params', () => {
  const props = {
    ...fakeProps(),
  };
  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <Sieve {...props} filterOptions={undefined} syncWithSearchParams />
        ),
      },
    ],
    {
      initialEntries: [
        `/?search=""&${encodeURIComponent(
          props.filterOptions![randomFilterGroup].label
        )}=${encodeURIComponent('[]')}`,
      ],
      initialIndex: 0,
    }
  );

  render(<RouterProvider router={router} />);

  for (const option of props.filterOptions![randomFilterGroup].options) {
    expect(screen.queryByText(option.label)).not.toBeInTheDocument();
  }
});

test('Search params works with "bad" search params', () => {
  const props = {
    ...fakeProps(),
  };
  const randomFilterGroup = faker.number.int({
    min: 0,
    max: (props.filterOptions?.length ?? 0) - 1,
  });

  let router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Sieve {...props} syncWithSearchParams />,
      },
    ],
    {
      initialEntries: ['/'],
      initialIndex: 0,
    }
  );

  const { rerender } = render(<RouterProvider router={router} />);

  // Search params include parameters but sieveValue doesn't, so we expect the bad search params to be updated (deleted)
  router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <Sieve
            {...props}
            sieveValue={{
              ...props.sieveValue,
              filterValues: undefined,
            }}
            syncWithSearchParams
          />
        ),
      },
    ],
    {
      initialEntries: [
        `/?${encodeURIComponent(
          props.filterOptions![randomFilterGroup].label
        )}=${encodeURIComponent(
          JSON.stringify([
            props.filterOptions![randomFilterGroup].options[0].label,
          ])
        )}`,
      ],
      initialIndex: 0,
    }
  );

  rerender(<RouterProvider router={router} />);

  expect(
    screen.queryByText(props.filterOptions![randomFilterGroup].options[0].label)
  ).not.toBeInTheDocument();
});

test('debounced search value works as expected', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  let text = '';
  const customOnUpdate = (value: SieveValue) => {
    text += value.searchValue;
  };

  render(
    <Sieve {...props} onUpdate={customOnUpdate} debounceSearchValue={true} />,
    { wrapper: Wrappers }
  );

  const searchField = screen.getByRole('textbox');

  const fakeText = faker.animal.cetacean();
  await user.type(searchField, fakeText);

  expect(text).toBe('');

  await waitFor(() => expect(text).toBe(fakeText), { timeout: 1000 });
});

test('debounced search value works as expected when clearing after starting to type', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  let text = undefined;
  const customOnUpdate = (value: SieveValue) => {
    text = value.searchValue;
  };

  render(
    <Sieve {...props} onUpdate={customOnUpdate} debounceSearchValue={true} />,
    { wrapper: Wrappers }
  );

  const searchField = screen.getByRole('textbox');

  const fakeText = faker.animal.cetacean();
  await user.type(searchField, fakeText);

  expect(text).toBeUndefined();

  await user.clear(searchField);

  expect(text).toBeUndefined();
});

test('debounced search calls onIsTyping as expected', async () => {
  const props = fakeProps();
  const user = userEvent.setup();

  const handleOnIsTyping = vi.fn();

  render(
    <Sieve
      {...props}
      debounceSearchValue={true}
      onIsTyping={handleOnIsTyping}
    />,
    { wrapper: Wrappers }
  );

  const searchField = screen.getByRole('textbox');

  const fakeText = faker.animal.cetacean();
  await user.type(searchField, fakeText);
  expect(handleOnIsTyping).toHaveBeenCalledWith(true);

  // Debounce is 800ms, give 100ms of leeway in the test
  await waitFor(() => expect(handleOnIsTyping).toHaveBeenCalledWith(false), {
    timeout: 900,
  });

  await user.type(searchField, fakeText);
  expect(handleOnIsTyping).toHaveBeenCalledWith(true);

  // Clear the text before debounce is done
  await user.clear(searchField);

  expect(handleOnIsTyping).toHaveBeenCalledWith(false);
});
