import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import { DateRangePicker, DateRangePickerProps } from './DateRangePicker';
import { Stack } from 'src/storybook';

import { action } from 'storybook/actions';

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

export const LimitSpecificDays: StoryFn<DateRangePickerProps> = (args) => {
  const isDateUnavailable = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  return <DateRangePicker {...args} isDateUnavailable={isDateUnavailable} />;
};
