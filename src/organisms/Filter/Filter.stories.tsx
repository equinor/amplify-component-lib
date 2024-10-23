import { FC } from 'react';

import { DatePicker } from '@equinor/eds-core-react';
import { car, car_wash } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react';

import { Filter, FilterProps } from './Filter';
import { formatDate } from 'src/atoms';
import { SingleSelect } from 'src/molecules';

const Wrapper: FC<FilterProps> = (props) => (
  <Filter {...props}>
    <DatePicker label="Created date" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
      }}
    >
      <SingleSelect
        value={undefined}
        label="Environment"
        onSelect={(value) => console.log(value)}
        items={[
          { value: 'development', label: 'Development' },
          { value: 'staging', label: 'Staging' },
          { value: 'production', label: 'Production' },
        ]}
      />
      <SingleSelect
        value={undefined}
        label="Environment"
        onSelect={(value) => console.log(value)}
        items={[
          { value: 'development', label: 'Development' },
          { value: 'staging', label: 'Staging' },
          { value: 'production', label: 'Production' },
        ]}
      />
    </div>
  </Filter>
);

const meta: Meta<typeof Filter> = {
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
    onSearch: {
      type: 'function',
      description:
        'Callback when search is entered (only when hitting {Enter})',
    },
  },
  args: {
    values: [
      {
        value: 'development',
        label: 'Development',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  args: {},
};

export const ValuesWithIcons: Story = {
  args: {
    placeholder: 'Search for a car...',
    values: [
      {
        value: 'car',
        label: 'Toyota',
        icon: car,
      },
      {
        value: 'purchase-date',
        label: `Purchased: ${formatDate(new Date(), { format: 'DD. month YYYY' })}`,
      },
      {
        value: 'state',
        label: 'Newly washed',
        icon: car_wash,
      },
    ],
  },
};

export const WithEmptyValues: Story = {
  args: {
    values: [],
  },
};

export const InitialOpen: Story = {
  args: {
    initialOpen: true,
  },
};

export const WithoutClearButton: Story = {
  args: {
    initialOpen: true,
    showClearFiltersButton: false,
  },
};
