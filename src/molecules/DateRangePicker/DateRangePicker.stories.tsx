import { useState } from 'react';

import { DateRangePicker, DateRangePickerProps } from '@equinor/eds-core-react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import page from './DateRangePicker.docs.mdx';
import { Stack } from 'src/storybook';

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
      page,
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
            height: '100px',
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
