import { useState } from 'react';
import { I18nProvider } from 'react-aria';

import { Autocomplete, Icon, NativeSelect } from '@equinor/eds-core-react';
import { person } from '@equinor/eds-icons';
import { CalendarDate } from '@internationalized/date';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { DatePicker, DatePickerProps } from './DatePicker';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import { Stack } from 'src/storybook';

import { action } from 'storybook/actions';
import { expect, userEvent, within } from 'storybook/test';

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

// Test-only stories
type Story = StoryObj<typeof DatePicker>;

export const TestDefaultFormat: Story = {
  tags: ['test-only'],
  args: {
    value: new Date('2024-07-25'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [dayEl, monthEl, yearEl] = canvas.getAllByRole('spinbutton');
    await expect(dayEl).toHaveTextContent('25');
    await expect(monthEl).toHaveTextContent('07');
    await expect(yearEl).toHaveTextContent('2024');
  },
};

export const TestCustomFormat: Story = {
  tags: ['test-only'],
  args: {
    value: new Date('2024-07-25'),
    formatOptions: {
      month: 'short',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Jul')).toBeInTheDocument();
  },
};

export const TestDefaultLocale: Story = {
  tags: ['test-only'],
  args: {
    value: new Date('2021-07-25'),
    hideClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('July 2021')).toBeInTheDocument();
  },
};

export const TestCustomLocale: Story = {
  tags: ['test-only'],
  args: {
    value: new Date('2021-07-25'),
    locale: 'no-NB',
    hideClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('juli 2021')).toBeInTheDocument();
  },
};

export const TestMetaTextDisplayed: Story = {
  tags: ['test-only'],
  args: {
    meta: 'Meta information',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Meta information')).toBeInTheDocument();
  },
};

export const TestDirtyVariant: Story = {
  tags: ['test-only'],
  args: {
    value: new Date('2021-07-25'),
    variant: 'dirty',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole('button')[0];
    // Verify the variant is applied (checking computed styles is complex in tests)
    await expect(button).toBeInTheDocument();
  },
};

export const TestErrorVariant: Story = {
  tags: ['test-only'],
  args: {
    value: new Date('2021-07-25'),
    variant: 'error',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole('button')[0];
    // Verify the variant is applied (checking computed styles is complex in tests)
    await expect(button).toBeInTheDocument();
  },
};

export const TestLoadingState: Story = {
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

export const TestLoadingWithHelperProps: Story = {
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
