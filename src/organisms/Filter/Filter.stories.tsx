import { FC } from 'react';

import { DatePicker } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react';

import { Filter, FilterProps } from './Filter';
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
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'calc(100vw - 10rem)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    initialOpen: { type: 'boolean', description: 'Default is false' },
    onClearAllFilters: {
      type: 'function',
      description: 'Callback when clear all filters button is clicked',
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
