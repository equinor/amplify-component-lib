import { DatePicker } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react';

import { FilterHeader, FilterHeaderProps } from './FilterHeader';
import { SingleSelect } from 'src/molecules';

const Wrapper = (props: FilterHeaderProps) => (
  <FilterHeader {...props}>
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
  </FilterHeader>
);

const meta: Meta<typeof FilterHeader> = {
  title: 'Molecules/FilterHeader',
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
type Story = StoryObj<typeof FilterHeader>;

export const Default: Story = {
  args: {},
};
