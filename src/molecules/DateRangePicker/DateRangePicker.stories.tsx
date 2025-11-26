import { useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { person } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { DateRangePicker, DateRangePickerProps } from './DateRangePicker';
import { Stack } from 'src/storybook';

import { action } from 'storybook/actions';
import { expect, userEvent, within } from 'storybook/test';

const PrimaryComponent = (props: DateRangePickerProps) => {
  const [value, setValue] = useState({
    from: new Date(),
    to: new Date(),
  });
  return (
    <DateRangePicker
      {...props}
      value={value}
      onChange={(v) => {
        action('onChange')(v);
        // This story has been copied from EDS so I guess their types for the value is just weird in the callback(?)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setValue(v);
      }}
    />
  );
};

const meta: Meta<typeof DateRangePicker> = {
  title: 'Molecules/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack
          style={{
            display: 'grid',
            gridGap: '32px',
            gridTemplateColumns: 'repeat(4, auto)',
            alignItems: 'start',
            height: '130px',
          }}
        >
          <Story />
        </Stack>
      );
    },
  ],
};

export default meta;

export const Introduction: StoryFn<DateRangePickerProps> = (args) => (
  <PrimaryComponent {...args} />
);

export const Loading: StoryFn<DateRangePickerProps> = (args) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      gap: '24px',
    }}
  >
    <DateRangePicker {...args} loading value={undefined} />
    <DateRangePicker {...args} loading label="Label" value={undefined} />
  </div>
);

export const Variants: StoryFn = (props: DateRangePickerProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      gap: '24px',
    }}
  >
    <DateRangePicker {...props} variant="warning" label="Warning" />
    <DateRangePicker {...props} variant="error" label="Error" />
    <DateRangePicker {...props} variant="success" label="Success" />
    <DateRangePicker {...props} variant="dirty" label="Dirty" />
  </div>
);

const min = new Date();
const max = new Date();
min.setDate(2);
max.setMonth(max.getMonth() + 1);
max.setDate(-1);

export const WithMinAndMaxValue: StoryFn = (args) => (
  <DateRangePicker {...args} minValue={min} maxValue={max} />
);

// Test-only stories
type Story = StoryObj<typeof DateRangePicker>;

export const DefaultFormat: Story = {
  tags: ['test-only'],
  args: {
    value: { from: new Date('2024-07-25'), to: new Date('2024-07-26') },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [dayEl, monthEl, yearEl] = canvas.getAllByRole('spinbutton');
    await expect(dayEl).toHaveTextContent('25');
    await expect(monthEl).toHaveTextContent('07');
    await expect(yearEl).toHaveTextContent('2024');
  },
};

export const CustomFormat: Story = {
  tags: ['test-only'],
  args: {
    value: { from: new Date('2025-02-01'), to: new Date('2025-03-01') },
    formatOptions: {
      month: 'short',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Feb')).toBeInTheDocument();
  },
};

export const DefaultLocale: Story = {
  tags: ['test-only'],
  args: {
    value: { from: new Date('2021-07-25'), to: new Date('2021-07-26') },
    hideClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('July 2021')).toBeInTheDocument();
  },
};

export const CustomLocale: Story = {
  tags: ['test-only'],
  args: {
    value: { from: new Date('2021-07-25'), to: new Date('2021-07-26') },
    locale: 'no-NB',
    hideClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('juli 2021')).toBeInTheDocument();
  },
};

export const MetaText: Story = {
  tags: ['test-only'],
  args: {
    meta: 'Meta information',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Meta information')).toBeInTheDocument();
  },
};

export const LoadingState: Story = {
  tags: ['test-only'],
  args: {
    label: 'Test',
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
  },
};

export const LoadingWithHelperProps: Story = {
  tags: ['test-only'],
  args: {
    label: 'Test',
    loading: true,
    helperProps: { text: 'Helper', icon: <Icon data={person} /> },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
  },
};

export const LimitSpecificDays: StoryFn<DateRangePickerProps> = (args) => {
  const isDateUnavailable = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  return <DateRangePicker {...args} isDateUnavailable={isDateUnavailable} />;
};
