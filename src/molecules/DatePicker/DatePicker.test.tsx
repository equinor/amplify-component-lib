import { faker } from '@faker-js/faker';

import { DatePicker } from 'src/molecules/DatePicker/DatePicker';
import { render, screen } from 'src/tests/browsertest-utils';

test('Expect default format to be long month', async () => {
  const randomDate = faker.date.recent();
  render(<DatePicker value={randomDate} />);

  expect(
    screen.getByText(
      randomDate.toLocaleDateString('en-GB', {
        month: 'long',
      })
    )
  ).toBeInTheDocument();
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
  render(<DatePicker value={randomDate} />);

  expect(screen.getByText('July')).toBeInTheDocument();
});

test('Able to override locale', async () => {
  const randomDate = new Date('25. july 2021');
  render(<DatePicker value={randomDate} locale={'no-NB'} />);

  expect(screen.getByText('juli')).toBeInTheDocument();
});

test('Meta text is displayed', async () => {
  const meta = faker.animal.bear();
  render(<DatePicker meta={meta} />);

  expect(screen.getByText(meta)).toBeInTheDocument();
});
