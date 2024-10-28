import { ChangeEvent, FC, useMemo, useState } from 'react';

import { DatePicker } from '@equinor/eds-core-react';
import { gear, van } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react';

import { Filter, FilterProps } from './Filter';
import { formatDate } from 'src/atoms';
import { SelectOptionRequired, SingleSelect } from 'src/molecules';

const CAR_SIZE = [
  { value: 'size', label: 'Sports car' },
  { value: 'size', label: 'Kei car' },
  { value: 'size', label: 'Family van' },
];
const MANUFACTURER = [
  { value: 'toyota', label: 'トヨタ (Toyota)' },
  { value: 'mazda', label: 'マツダ (Mazda)' },
  { value: 'created-by', label: '鈴木 (Suzuki)' },
];

type FilterStoryProps = FilterProps & { withIcons?: boolean };

const Wrapper: FC<FilterStoryProps> = (props) => {
  const [carSize, setCarSize] = useState<SelectOptionRequired | undefined>(
    undefined
  );
  const [manufacturer, setManufacturer] = useState<
    SelectOptionRequired | undefined
  >(
    props.values?.find((value) =>
      MANUFACTURER.some((manufacturer) => manufacturer.value === value.value)
    )
  );
  const [manufacturerDate, setManufacturerDate] = useState<Date | undefined>(
    undefined
  );
  const [search, setSearch] = useState<string>('');
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const values = useMemo(() => {
    const all: FilterProps['values'] = [];

    if (carSize) {
      if (props.withIcons) {
        all.push({ ...carSize, icon: van });
      } else {
        all.push(carSize);
      }
    }

    if (manufacturer) {
      if (props.withIcons) {
        all.push({ ...manufacturer, icon: gear });
      } else {
        all.push(manufacturer);
      }
    }

    if (manufacturerDate) {
      all.push({
        value: 'manufacturer-date',
        label: `Manufactured: ${formatDate(manufacturerDate, {
          format: 'DD. month YYYY',
        })}`,
      });
    }

    if (searchTags) {
      for (const [index, searchTag] of searchTags.entries()) {
        all.push({ value: `search-${index}`, label: searchTag });
      }
    }

    return all;
  }, [carSize, manufacturer, manufacturerDate, props.withIcons, searchTags]);

  const handleOnSelectEnvironment = (
    value: SelectOptionRequired | undefined
  ) => {
    setCarSize(value);
  };

  const handleOnSelectCreatedBy = (value: SelectOptionRequired | undefined) => {
    setManufacturer(value);
  };

  const handleOnChangManufacturerDate = (value: Date | null) => {
    setManufacturerDate(value || undefined);
  };

  const handleOnClearFilter = (value: string) => {
    if (MANUFACTURER.some((manufacturer) => manufacturer.value === value)) {
      setManufacturer(undefined);
    } else if (CAR_SIZE.some((size) => size.value === value)) {
      setCarSize(undefined);
    } else if (value === 'manufacturer-date') {
      setManufacturerDate(undefined);
    } else if (value.includes('search')) {
      setSearchTags((prev) => {
        const copy = [...prev];
        const index = Number(value.split('-')[1]);
        copy.splice(index, 1);
        return copy;
      });
    }
  };

  const handleOnClearAllFilters = () => {
    setCarSize(undefined);
    setManufacturer(undefined);
    setManufacturerDate(undefined);
    setSearch('');
  };

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnSearchEnter = (value: string) => {
    setSearchTags((prev) => [...prev, value]);
    setSearch('');
  };

  return (
    <Filter
      {...props}
      values={values}
      search={search}
      onSearchEnter={handleOnSearchEnter}
      onSearchChange={handleOnSearch}
      onClearFilter={handleOnClearFilter}
      onClearAllFilters={handleOnClearAllFilters}
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
          onSelect={handleOnSelectEnvironment}
          items={CAR_SIZE}
        />
        <SingleSelect
          value={manufacturer}
          label="Created by"
          onSelect={handleOnSelectCreatedBy}
          items={MANUFACTURER}
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
    showClearFiltersButton: { type: 'boolean', description: 'Default is true' },
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
type Story = StoryObj<FilterStoryProps>;

export const Default: Story = {
  args: {
    values: [MANUFACTURER[1]],
  },
};

export const ValuesWithIcons: Story = {
  args: {
    values: [MANUFACTURER[1]],
    withIcons: true,
  },
};

export const WithEmptyValues: Story = {
  args: {
    values: [],
  },
};

export const InitialOpen: Story = {
  args: {
    values: [MANUFACTURER[1]],
    initialOpen: true,
  },
};

export const WithoutClearButton: Story = {
  args: {
    values: [MANUFACTURER[1]],
    initialOpen: true,
    showClearFiltersButton: false,
  },
};
