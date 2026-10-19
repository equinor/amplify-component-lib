import { useState } from 'react';

import { calendar_date_range, lock } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { DateRangePicker, DateRangePickerProps } from './DateRangePicker';
import { Stack } from 'src/storybook';

import { action } from 'storybook/actions';
import { expect, fn, screen, userEvent, within } from 'storybook/test';

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

type Story = StoryObj<typeof DateRangePicker>;

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

export const Locked: StoryFn<DateRangePickerProps> = (args) => {
  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 7);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DateRangePicker {...args} label="Locked" value={{ from, to }} locked />
      <DateRangePicker
        {...args}
        label="Locked empty"
        value={undefined}
        locked
      />
    </div>
  );
};

export const Autofilled: StoryFn<DateRangePickerProps> = (args) => {
  const [value, setValue] = useState<DateRangePickerProps['value']>(() => {
    const to = new Date();
    to.setDate(to.getDate() + 7);
    return { from: new Date(), to };
  });
  const [autofilled, setAutofilled] = useState(true);

  return (
    <DateRangePicker
      {...args}
      label="Autofilled"
      helperProps={{ text: 'Background resets when the value is changed' }}
      value={value}
      autofilled={autofilled}
      onChange={(range) => {
        setValue(range ?? undefined);
        setAutofilled(false);
      }}
    />
  );
};

const LOCKED_BACKGROUND = 'rgb(247, 247, 247)';
const AUTOFILLED_BACKGROUND = 'rgb(211, 231, 253)';
const TEST_RANGE = { from: new Date(2021, 6, 25), to: new Date(2021, 6, 30) };

const getField = (canvasElement: HTMLElement) => {
  const spinbuttons = within(canvasElement).getAllByRole('spinbutton');
  return {
    spinbuttons,
    dayEl: spinbuttons[0],
    field: spinbuttons[0].closest('[class*="StyledInputFieldWrapper"]'),
  };
};

export const TestLockedIsReadOnly: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    label: 'Locked',
    value: TEST_RANGE,
    variant: 'error',
    locked: true,
    onChange: fn(),
  },
  play: async ({ canvas, canvasElement, args }) => {
    const { dayEl, field } = getField(canvasElement);

    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(`path[d="${lock.svgPathData}"]`)
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(
        `path[d="${calendar_date_range.svgPathData}"]`
      )
    ).toBeInTheDocument();
    await expect(dayEl).toHaveAttribute('aria-readonly', 'true');
    await expect(field).toHaveStyle({
      backgroundColor: LOCKED_BACKGROUND,
      boxShadow: 'none',
    });

    await userEvent.click(dayEl);
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('1');

    await expect(screen.queryByText('July 2021')).not.toBeInTheDocument();
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const TestLockedCalendarIconDoesNotOverlapDates: Story = {
  tags: ['!dev', '!autodocs'],
  args: { label: 'Locked', value: TEST_RANGE, locked: true },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <DateRangePicker {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const { spinbuttons } = getField(canvasElement);
    const lastDateRight =
      spinbuttons[spinbuttons.length - 1].getBoundingClientRect().right;
    const calendarIcon = canvasElement
      .querySelector(`path[d="${calendar_date_range.svgPathData}"]`)!
      .closest('svg')!;

    await expect(lastDateRight).toBeLessThanOrEqual(
      calendarIcon.getBoundingClientRect().left
    );
  },
};

export const TestDisabledTakesPrecedenceOverLocked: Story = {
  tags: ['!dev', '!autodocs'],
  args: { label: 'Test', disabled: true, locked: true },
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelector(`path[d="${lock.svgPathData}"]`)
    ).not.toBeInTheDocument();
  },
};

export const TestLockedAndAutofilled: Story = {
  tags: ['!dev', '!autodocs'],
  args: { value: TEST_RANGE, locked: true, autofilled: true },
  play: async ({ canvasElement }) => {
    const { dayEl, field } = getField(canvasElement);

    await expect(dayEl).toHaveAttribute('aria-readonly', 'true');
    await expect(
      canvasElement.querySelector(`path[d="${lock.svgPathData}"]`)
    ).toBeInTheDocument();
    await expect(field).toHaveStyle({
      backgroundColor: AUTOFILLED_BACKGROUND,
      boxShadow: 'none',
    });
  },
};

export const TestAutofilledBackground: Story = {
  tags: ['!dev', '!autodocs'],
  args: { value: TEST_RANGE, autofilled: true },
  play: async ({ canvas, canvasElement }) => {
    const { field } = getField(canvasElement);

    await expect(field).toHaveStyle({
      backgroundColor: AUTOFILLED_BACKGROUND,
    });
    await expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);
  },
};

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
