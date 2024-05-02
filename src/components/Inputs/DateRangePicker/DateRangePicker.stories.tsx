import { useState } from 'react';

import { DateRangePicker } from '@equinor/eds-core-react';
import { DateRangePickerProps } from '@equinor/eds-core-react/dist/types/components/Datepicker/props';
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
    // Ignored typescript because of DateRangePickerProps get undefind from eds and not exported from eds-core-react
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <DateRangePicker
      {...props}
      value={value}
      onChange={(v) => {
        action('onChange')(v);
        setValue(v);
      }}
    />
  );
};

const meta: Meta<typeof DateRangePicker> = {
  title: 'Inputs/Dates/DateRangePicker',
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <DateRangePicker {...args} isDateUnavailable={isDateUnavailable} />;
};
