import { faker } from '@faker-js/faker';

import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Expect default format', async () => {
  const randomDate = faker.date.recent();
  render(<DatePicker value={randomDate} />);

  const day = randomDate.getDate().toString().padStart(2, '0');
  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
  const year = randomDate.getFullYear().toString();

  const [dayEl, monthEl, yearEl] = screen.getAllByRole('spinbutton');
  expect(dayEl).toHaveTextContent(day);
  expect(monthEl).toHaveTextContent(month);
  expect(yearEl).toHaveTextContent(year);
});

test('Able to override format', async () => {
  const randomDate = faker.date.recent();
  render(
    <DatePicker
      value={randomDate}
      formatOptions={{
        month: 'short',
      }}
    />
  );

  expect(
    screen.getByText(
      randomDate.toLocaleDateString('en-GB', {
        month: 'short',
      })
    )
  ).toBeInTheDocument();
});

test('Expect default locale to be en-GB', async () => {
  const randomDate = new Date('25. july 2021');
  render(<DatePicker value={randomDate} hideClearButton />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText('July 2021')).toBeInTheDocument();
});

test('Able to override locale', async () => {
  const randomDate = new Date('25. july 2021');
  render(<DatePicker value={randomDate} locale={'no-NB'} hideClearButton />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText('juli 2021')).toBeInTheDocument();
});

test('Meta text is displayed', async () => {
  const meta = faker.animal.bear();
  render(<DatePicker meta={meta} />);

  expect(screen.getByText(meta)).toBeInTheDocument();
});
