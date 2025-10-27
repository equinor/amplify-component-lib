import { ChangeEvent, FC, useMemo, useState } from 'react';

import { DatePicker, Tabs } from '@equinor/eds-core-react';
import { gear, van } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Filter } from '.';
import { formatDate } from 'src/atoms/utils';
import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
import {
  FilterProps,
  FilterWithAutoCompleteOptions,
} from 'src/organisms/Filter/Filter.types';

import { actions } from 'storybook/actions';
import { expect, fn, userEvent } from 'storybook/test';

const CAR_SIZE = [
  { value: 'sports-car', label: 'Sports car' },
  { value: 'kei-car', label: 'Kei car' },
  { value: 'family-van', label: 'Family van' },
];
const MANUFACTURERS = [
  { value: 'toyota', label: 'トヨタ (Toyota)' },
  { value: 'mazda', label: 'マツダ (Mazda)' },
  { value: 'created-by', label: '鈴木 (Suzuki)' },
];

enum Sorting {
  Name = 'Name',
  Date = 'Date',
}

type FilterStoryProps = FilterProps<string> & {
  withIcons?: boolean;
  withSorting?: boolean;
  withQuickFilter?: boolean;
  withTabs?: boolean;
  withAutoComplete?: boolean;
};

const Wrapper: FC<FilterStoryProps> = (props) => {
  const [carSize, setCarSize] = useState<SelectOptionRequired | undefined>(
    props.values['carSize']?.at(0) ?? undefined
  );
  const [manufacturer, setManufacturer] = useState<SelectOptionRequired[]>(
    props.values['manufacturer'] ?? []
  );
  const [manufacturerDate, setManufacturerDate] = useState<Date | undefined>(
    undefined
  );
  const [search, setSearch] = useState<string>('');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<Sorting>(Sorting.Name);
  const [selectedTab, setSelectedTab] = useState(0);

  const values = useMemo(() => {
    const all: FilterProps<string>['values'] = {};

    if (carSize) {
      all['carSize'] = [
        { ...carSize, icon: props.withIcons ? van : undefined },
      ];
    }

    if (manufacturer) {
      all['manufacturer'] = manufacturer.map((item) => ({
        ...item,
        icon: props.withIcons ? gear : undefined,
      }));
    }

    if (manufacturerDate) {
      all['manufacturerDate'] = [
        {
          value: manufacturerDate.toDateString(),
          label: `Manufactured: ${formatDate(manufacturerDate, {
            format: 'DD. month YYYY',
          })}`,
        },
      ];
    }

    if (searchTags) {
      all['search'] = searchTags.map((searchTag) => ({
        value: searchTag,
        label: searchTag,
      }));
    }

    return all;
  }, [carSize, manufacturer, manufacturerDate, props.withIcons, searchTags]);

  const handleOnSelectEnvironment = (
    value: SelectOptionRequired | undefined
  ) => {
    setCarSize(value);
  };

  const handleSelectManufacturer = (value: SelectOptionRequired[]) => {
    setManufacturer(value);
  };

  const handleOnChangManufacturerDate = (value: Date | null) => {
    setManufacturerDate(value || undefined);
  };

  const handleOnClearFilter = (key: string, index: number) => {
    actions('onClearFilter').onClearFilter(key, index);
    switch (key) {
      case 'carSize':
        setCarSize(undefined);
        break;
      case 'manufacturer':
        setManufacturer(() => {
          const copy = structuredClone(values['manufacturer']);
          copy.splice(index, 1);
          return copy;
        });
        break;
      case 'manufacturerDate':
        setManufacturerDate(undefined);
        break;
      case 'search':
        setSearchTags(() => {
          const copy = structuredClone(values['search']);
          copy.splice(index, 1);
          return copy.map((item) => item.value);
        });
        break;
    }
  };

  const handleOnClearAllFilters = () => {
    actions('onClearAllFilters').onClearAllFilters();
    setCarSize(undefined);
    setManufacturer([]);
    setManufacturerDate(undefined);
    setSearchTags([]);
  };

  const handleOnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    actions('onSearchChange').onSearchChange(event.target.value);
    setSearch(event.target.value);
  };

  const handleOnSearchEnter = (value: string) => {
    actions('onSearchEnter').onSearchEnter(value);
    setSearchTags((prev) => [...prev, value]);
    setSearch('');
  };

  const handleOnQuickFilter = (key: string, value: SelectOptionRequired) => {
    switch (key) {
      case 'manufacturer':
        setManufacturer((prev) => {
          if (prev.findIndex((item) => item.value === value.value) === -1) {
            return [...prev, value];
          } else {
            return prev.filter((item) => item.value !== value.value);
          }
        });
        break;
    }
  };

  const handleOnAutoComplete = (key: string, value: SelectOptionRequired) => {
    actions('onAutoComplete').onAutoComplete(key, value);
    if ('onAutoComplete' in props) {
      props.onAutoComplete(key, value);
    }

    switch (key) {
      case 'manufacturer':
        setManufacturer((prev) => [...prev, value]);
        break;
      case 'carSize':
        setCarSize(value);
        break;
    }

    setSearch('');
  };

  return (
    <Filter
      {...props}
      values={values}
      search={search}
      onSearchEnter={handleOnSearchEnter}
      onSearchChange={handleOnSearchChange}
      onClearFilter={handleOnClearFilter}
      onClearAllFilters={handleOnClearAllFilters}
      autoCompleteOptions={
        props.withAutoComplete
          ? {
              carSize: CAR_SIZE,
              manufacturer: MANUFACTURERS,
            }
          : undefined
      }
      onAutoComplete={props.withAutoComplete ? handleOnAutoComplete : undefined}
      topContent={
        props.withTabs ? (
          <Tabs
            activeTab={selectedTab}
            onChange={(index) => setSelectedTab(index)}
          >
            <Tabs.List>
              <Tabs.Tab>All categories</Tabs.Tab>
              <Tabs.Tab>One</Tabs.Tab>
              <Tabs.Tab>Two</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        ) : undefined
      }
      inlineContent={
        <>
          {props.withQuickFilter && (
            <Filter.QuickFilter
              values={values}
              items={{
                manufacturer: [MANUFACTURERS[0]],
              }}
              onQuickFilter={handleOnQuickFilter}
            />
          )}
          {props.withSorting && (
            <Filter.SortMenu
              value={sortValue}
              onChange={setSortValue}
              items={Object.values(Sorting).map((value) => ({
                value,
                label: value,
              }))}
            />
          )}
        </>
      }
    >
      <DatePicker
        label="Manufacturer date"
        value={manufacturerDate}
        onChange={handleOnChangManufacturerDate}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        <SingleSelect
          value={carSize}
          label="Car size"
          placeholder="Select car size..."
          onSelect={handleOnSelectEnvironment}
          items={CAR_SIZE}
        />
        <ComboBox
          values={manufacturer}
          label="Manufacturer"
          placeholder="Select manufacturer..."
          onSelect={handleSelectManufacturer}
          items={MANUFACTURERS}
          showSelectedAsText
        />
      </div>
    </Filter>
  );
};

const meta: Meta<FilterStoryProps> = {
  title: 'Organisms/Filter',
  component: Wrapper,
  parameters: {
    layout: 'padded',
    actions: { argTypesRegex: '^on.*' },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=9801-44479&t=iOpa7kGdXfEcX6sJ-4',
    },
    docs: {
      source: {
        code: `<Filter {...props} 
   inlineContent={
      <Filter.QuickFilter
        items={{
          manufacturer: [MANUFACTURERS[0]],
        }}
        onQuickFilter={handleOnQuickFilter}
      />
      <Filter.SortMenu
        value={sortValue}
        onChange={setSortValue}
        items={Object.values(Sorting).map((value) => ({
          value,
          label: value,
        }))}
      />
  } 
>
  <DatePicker label="Manufacturer date" />
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
    }}
  >
    <SingleSelect label="Car size" />
    <ComboBox label="Created by" />
  </div>
</Filter>
        `,
      },
    },
  },
  argTypes: {
    values: {
      description:
        'Array with values ({ label: string, value: string, icon?: IconData })',
    },
    search: {
      description: 'Search field value',
    },
    placeholder: {
      type: 'string',
      description: 'Search placeholder text, default is "Search..."',
      control: { type: 'text' },
    },
    initialOpen: { type: 'boolean', description: 'Default is false' },
    openOnFocus: { type: 'boolean', description: 'Default is true' },
    onClearFilter: {
      type: 'function',
      description: 'Callback when specific filters is cleared',
    },
    onClearAllFilters: {
      type: 'function',
      description: 'Callback when clear all filters button is clicked',
    },
    onSearchChange: {
      type: 'function',
      description: 'Callback when search is changed',
    },
  },
  args: {
    placeholder: 'Search for a car...',
  },
};

export default meta;
type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {
  args: {
    values: {
      manufacturer: faker.helpers.arrayElements(MANUFACTURERS, 2),
    },
  },
};

export const ValuesWithIcons: Story = {
  args: {
    values: {
      manufacturer: faker.helpers.arrayElements(MANUFACTURERS, 1),
      carSize: [faker.helpers.arrayElement(CAR_SIZE)],
    },
    withIcons: true,
  },
};

export const WithEmptyValues: Story = {
  args: {
    values: {},
  },
};

export const InitialOpen: Story = {
  args: {
    values: {
      manufacturer: faker.helpers.arrayElements(MANUFACTURERS, 1),
    },
    initialOpen: true,
  },
};

export const WithSorting: Story = {
  args: {
    values: {
      manufacturer: faker.helpers.arrayElements(MANUFACTURERS, 1),
    },
    withSorting: true,
  },
};

export const WithQuickFilter: Story = {
  args: {
    values: {
      manufacturer: faker.helpers.arrayElements(MANUFACTURERS, 1),
    },
    withQuickFilter: true,
  },
};

export const WithBoth: Story = {
  args: {
    values: {
      manufacturer: faker.helpers.arrayElements(MANUFACTURERS, 1),
    },
    withSorting: true,
    withQuickFilter: true,
  },
};

export const WithTopContent: Story = {
  args: {
    withTabs: true,
    values: {
      manufacturer: faker.helpers.arrayElements(MANUFACTURERS, 1),
    },
  },
};

export const WithAutoComplete: Story = {
  args: {
    withAutoComplete: true,
    onAutoComplete: fn(),
    values: {},
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('searchbox'));
    await userEvent.keyboard(faker.animal.fish());
    await userEvent.keyboard('{Enter}');

    await expect(
      (args as FilterWithAutoCompleteOptions<string>).onAutoComplete
    ).not.toHaveBeenCalled();

    // Remove search text
    await userEvent.keyboard('{Backspace}');
    await userEvent.keyboard('{Backspace}');

    const randomCarSize = faker.helpers.arrayElement(CAR_SIZE);

    await userEvent.type(canvas.getByRole('searchbox'), randomCarSize.label);
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    await expect(
      (args as FilterWithAutoCompleteOptions<string>).onAutoComplete
    ).toHaveBeenCalledWith(
      'carSize',
      expect.objectContaining({
        value: randomCarSize.value,
        label: randomCarSize.label,
      })
    );
  },
};

export const WithOpenOnFocusFalse: Story = {
  args: {
    openOnFocus: false,
    values: {},
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('searchbox'));

    await expect(canvas.queryByRole('combobox')).not.toBeInTheDocument();
  },
};
