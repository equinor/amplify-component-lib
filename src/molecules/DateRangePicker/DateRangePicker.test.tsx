import { Icon } from '@equinor/eds-core-react';
import { person } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { DateRangePicker } from './DateRangePicker';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Expect default format', async () => {
  const value = { from: faker.date.recent(), to: faker.date.future() };
  render(<DateRangePicker value={value} />);

  const day = value.from.getDate().toString().padStart(2, '0');
  const month = (value.from.getMonth() + 1).toString().padStart(2, '0');
  const year = value.from.getFullYear().toString();

  const [dayEl, monthEl, yearEl] = screen.getAllByRole('spinbutton');
  expect(dayEl).toHaveTextContent(day);
  expect(monthEl).toHaveTextContent(month);
  expect(yearEl).toHaveTextContent(year);
});

test('Able to override format', async () => {
  const value = { from: new Date(2025, 1, 1), to: new Date(2025, 2, 1) };
  render(
    <DateRangePicker
      value={value}
      formatOptions={{
        month: 'short',
      }}
    />
  );

  expect(
    screen.getByText(
      value.from.toLocaleDateString('en-GB', {
        month: 'short',
      })
    )
  ).toBeInTheDocument();
});

test('Expect default locale to be en-GB', async () => {
  const value = { from: new Date('25. july 2021'), to: faker.date.future() };
  render(<DateRangePicker value={value} hideClearButton />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText('July 2021')).toBeInTheDocument();
});

test('Able to override locale', async () => {
  const value = { from: new Date('25. july 2021'), to: faker.date.future() };
  render(<DateRangePicker value={value} locale={'no-NB'} hideClearButton />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText('juli 2021')).toBeInTheDocument();
});

test('Meta text is displayed', async () => {
  const meta = faker.animal.bear();
  render(<DateRangePicker meta={meta} />);

  expect(screen.getByText(meta)).toBeInTheDocument();
});

test('Dirty variant', async () => {
  const value = { from: faker.date.recent(), to: faker.date.future() };
  render(<DateRangePicker value={value} variant="dirty" />);

  expect(screen.getAllByRole('button')[0].parentElement!).toHaveStyle(
    `box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS['dirty']}`
  );
});

test('Error variant', async () => {
  const value = { from: faker.date.recent(), to: faker.date.future() };
  render(<DateRangePicker value={value} variant="error" />);

  expect(screen.getAllByRole('button')[0].parentElement!).toHaveStyle(
    `box-shadow: inset 0 -1px 0 0 ${VARIANT_COLORS['error']}`
  );
});

test('Loading works as expected', async () => {
  render(<DateRangePicker label="Test" loading />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('Loading works as expected with helper props', async () => {
  render(
    <DateRangePicker
      label="Test"
      loading
      helperProps={{ text: 'Helper', icon: <Icon data={person} /> }}
    />
  );

  expect(await screen.findByRole('progressbar')).toBeInTheDocument();
});
