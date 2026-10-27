import { useState } from 'react';
import { I18nProvider } from 'react-aria';

import { Autocomplete, NativeSelect } from '@equinor/eds-core-react';
import { calendar, lock } from '@equinor/eds-icons';
import { CalendarDate } from '@internationalized/date';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { DatePicker, DatePickerProps } from './DatePicker';
import { Stack } from 'src/storybook';

import { action } from 'storybook/actions';
import { expect, fn, screen, userEvent, within } from 'storybook/test';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/Datepicker',
  component: DatePicker,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=11604-108347&t=s5tJbytN4ZdQ0Xpk-4',
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack
          style={{
            display: 'grid',
            gridGap: '32px',
            gridTemplateColumns: '300px',
            alignItems: 'start',
            height: '400px',
          }}
        >
          <Story />
        </Stack>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: StoryFn = (props: DatePickerProps) => {
  return (
    <DatePicker
      {...props}
      onChange={(v) => {
        const str = v?.toISOString();
        action('onChange')(str);
      }}
    />
  );
};

export const Loading: StoryFn = (props: DatePickerProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DatePicker
        {...props}
        loading
        onChange={(v) => {
          const str = v?.toISOString();
          action('onChange')(str);
        }}
      />
      <DatePicker
        {...props}
        label="Loading"
        loading
        onChange={(v) => {
          const str = v?.toISOString();
          action('onChange')(str);
        }}
      />
    </div>
  );
};

export const Variants: StoryFn = (props: DatePickerProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DatePicker {...props} />
      <DatePicker {...props} variant="warning" />
      <DatePicker {...props} variant="error" />
      <DatePicker {...props} variant="success" />
      <DatePicker {...props} variant="dirty" />
    </div>
  );
};

export const Locked: StoryFn = (props: DatePickerProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DatePicker {...props} label="Locked" value={new Date()} locked />
      <DatePicker {...props} label="Locked empty" locked />
    </div>
  );
};

export const Autofilled: StoryFn = (props: DatePickerProps) => {
  const [value, setValue] = useState<Date | null>(new Date());
  const [autofilled, setAutofilled] = useState(true);

  return (
    <DatePicker
      {...props}
      label="Autofilled"
      helperProps={{ text: 'Background resets when the value is changed' }}
      value={value}
      autofilled={autofilled}
      onChange={(date) => {
        setValue(date);
        setAutofilled(false);
      }}
    />
  );
};

const LOCKED_BACKGROUND = 'rgb(247, 247, 247)';
const AUTOFILLED_BACKGROUND = 'rgb(211, 231, 253)';
const TEST_DATE = new Date('25. july 2021');

const getField = (canvasElement: HTMLElement) => {
  const [dayEl] = within(canvasElement).getAllByRole('spinbutton');
  return {
    dayEl,
    field: dayEl.closest('[class*="StyledInputFieldWrapper"]'),
  };
};

export const Explanation: Story = {
  args: {
    label: 'Label',
    explanation: 'This is an explanation tooltip',
  },
  play: async ({ canvas, args }) => {
    // The explanation must not leak into the accessible name of the inputs
    await expect(canvas.getAllByRole('spinbutton')[0]).not.toHaveAccessibleName(
      /explanation/i
    );
    const icon = within(canvas.getByText('Label')).getByTestId('eds-icon-path');
    await userEvent.hover(icon);
    const tooltip = await screen.findByRole('tooltip');
    await expect(tooltip).toHaveTextContent(`${args.explanation}`);
    await userEvent.unhover(icon);
  },
};

export const TestLockedIsReadOnly: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    label: 'Locked',
    value: TEST_DATE,
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
      canvasElement.querySelector(`path[d="${calendar.svgPathData}"]`)
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
  args: { value: TEST_DATE, locked: true, autofilled: true },
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
  args: { value: TEST_DATE, autofilled: true },
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
  <DatePicker {...args} minValue={min} maxValue={max} />
);

export const WithMetaText: StoryFn = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker {...args} meta="Required" />
    <DatePicker {...args} label="Label" meta="Required" />
  </div>
);

export const LimitSpecificDays: StoryFn<DatePickerProps> = (args) => {
  const isDateUnavailable = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  return <DatePicker {...args} isDateUnavailable={isDateUnavailable} />;
};

export const DateTime: StoryFn = () => {
  const [val, setValue] = useState(new Date());
  return (
    <DatePicker
      showTimeInput={true}
      value={val}
      onChange={(v) => {
        // Same as DateRangePicker, EDS's types
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setValue(v);
        action('onChange')(v?.toISOString());
      }}
    />
  );
};

export const CustomDisplayFormat: StoryFn = () => {
  const [val, setValue] = useState(new Date());
  return (
    <DatePicker
      formatOptions={{
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }}
      value={val}
      onChange={(v) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setValue(v);
        action('onChange')(v?.toISOString());
      }}
    />
  );
};

export const CustomLocale: StoryFn = () => {
  const [val, setValue] = useState(new Date());
  const [locale, setLocale] = useState('en-US');
  const locales = [
    { value: 'en-US', label: 'English' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'sv-SE', label: 'Swedish' },
    { value: 'zh-Hans', label: 'Chinese (Simplified)' },
    { value: 'zh-Hant', label: 'Chinese (Traditional)' },
  ];
  return (
    <div>
      <NativeSelect
        id={'locale-picker'}
        label={'Select locale'}
        onChange={(e) => setLocale(e.currentTarget.value)}
        value={locale}
      >
        {locales.map((l) => (
          <option value={l.value} key={l.value}>
            {l.label}
          </option>
        ))}
      </NativeSelect>{' '}
      <br />
      <I18nProvider locale={locale}>
        <DatePicker
          formatOptions={{
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          }}
          value={val}
          onChange={(v) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setValue(v);
            action('onChange')(v?.toISOString());
          }}
        />
      </I18nProvider>
    </div>
  );
};

const minusOneMonth = new Date();
minusOneMonth.setMonth(minusOneMonth.getMonth() - 1);
const plusOneMonth = new Date();
plusOneMonth.setMonth(plusOneMonth.getMonth() + 1);

const options = [
  { value: new Date(), label: 'Today' },
  { value: minusOneMonth, label: 'Previous month' },
  { value: plusOneMonth, label: 'Next month' },
];

export const CustomHeaderFooter: StoryFn<DatePickerProps> = ({
  value,
  ...args
}) => {
  const [val, setValue] = useState(value ?? new Date());
  return (
    <DatePicker
      {...args}
      value={val}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onChange={setValue}
      Header={({ setYear, setMonth, year, month }) => {
        const yrs: string[] = [];
        for (let i = 0; i < 30; i++) {
          yrs.push(`20${String(i).padStart(2, '0')}`);
        }
        return (
          <div>
            <button onClick={() => setMonth(month - 1)}>-</button>
            <NativeSelect
              style={{
                display: 'inline-block',
                width: 100,
              }}
              defaultValue={year}
              onChange={(e) => {
                setYear(Number(e.currentTarget.value));
              }}
              id={'set-year'}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              label={undefined}
            >
              {yrs.map((y) => (
                <option value={y} key={y}>
                  {y}
                </option>
              ))}
            </NativeSelect>
            -{month}
            <button onClick={() => setMonth(month + 1)}>+</button>
          </div>
        );
      }}
      Footer={({ state }) => (
        <div style={{ paddingBottom: 4 }}>
          <Autocomplete
            options={options}
            label={'Preset'}
            optionLabel={(v) => v.label}
            onOptionsChange={(v) => {
              const sel = v.selectedItems[0].value;
              state.setFocusedDate(
                new CalendarDate(
                  sel.getFullYear(),
                  sel.getMonth() + 1,
                  sel.getDate()
                )
              );
              setValue(sel);
            }}
          />
        </div>
      )}
    />
  );
};
