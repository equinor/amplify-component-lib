import { Icon } from '@equinor/eds-core-react';
import { calendar, lock, person } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { VARIANT_COLORS } from 'src/atoms/style/colors';
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

test('Dirty variant', async () => {
  const randomDate = new Date('25. july 2021');
  render(<DatePicker value={randomDate} variant="dirty" />);

  expect(screen.getAllByRole('button')[0].parentElement!).toHaveStyle(
    `box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS['dirty']}`
  );
});

test('Error variant', async () => {
  const randomDate = new Date('25. july 2021');
  render(<DatePicker value={randomDate} variant="error" />);

  expect(screen.getAllByRole('button')[0].parentElement!).toHaveStyle(
    `box-shadow: inset 0 -1px 0 0 ${VARIANT_COLORS['error']}`
  );
});

test('Loading works as expected', async () => {
  render(<DatePicker label="Test" loading />);

  expect(await screen.findByRole('progressbar')).toBeInTheDocument();
});

test('Loading works as expected with helperprops', async () => {
  render(
    <DatePicker
      label="Test"
      loading
      helperProps={{ text: 'Helper', icon: <Icon data={person} /> }}
    />
  );

  expect(await screen.findByRole('progressbar')).toBeInTheDocument();
});

test('Locked is read only, shows lock icon and does not open calendar', async () => {
  const randomDate = new Date('25. july 2021');
  const onChange = vi.fn();
  const { container } = render(
    <DatePicker
      label="Locked"
      value={randomDate}
      onChange={onChange}
      variant="error"
      locked
    />
  );
  const user = userEvent.setup();

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(
    container.querySelector(`path[d="${lock.svgPathData}"]`)
  ).toBeInTheDocument();
  expect(
    container.querySelector(`path[d="${calendar.svgPathData}"]`)
  ).toBeInTheDocument();

  const [dayEl] = screen.getAllByRole('spinbutton');
  const field = dayEl.closest('[class*="StyledInputFieldWrapper"]');
  expect(dayEl).toHaveAttribute('aria-readonly', 'true');
  expect(field).toHaveStyle('background-color: rgb(247, 247, 247)');
  expect(field).toHaveStyle('box-shadow: none');

  await user.click(dayEl);
  await user.keyboard('{Enter}');
  await user.keyboard('1');

  expect(screen.queryByText('July 2021')).not.toBeInTheDocument();
  expect(onChange).not.toHaveBeenCalled();
});

test('Disabled takes precedence over locked', async () => {
  const { container } = render(<DatePicker label="Test" disabled locked />);

  expect(
    container.querySelector(`path[d="${lock.svgPathData}"]`)
  ).not.toBeInTheDocument();
});

test('Locked and autofilled shows lock icon with autofilled background', () => {
  const { container } = render(
    <DatePicker value={new Date('25. july 2021')} locked autofilled />
  );

  const [dayEl] = screen.getAllByRole('spinbutton');
  const field = dayEl.closest('[class*="StyledInputFieldWrapper"]');
  expect(dayEl).toHaveAttribute('aria-readonly', 'true');
  expect(
    container.querySelector(`path[d="${lock.svgPathData}"]`)
  ).toBeInTheDocument();
  expect(field).toHaveStyle('background-color: rgb(211, 231, 253)');
  expect(field).toHaveStyle('box-shadow: none');
});

test('Autofilled sets autofilled background', async () => {
  const randomDate = new Date('25. july 2021');
  render(<DatePicker value={randomDate} autofilled />);

  const [dayEl] = screen.getAllByRole('spinbutton');
  expect(dayEl.closest('[class*="StyledInputFieldWrapper"]')).toHaveStyle(
    'background-color: rgb(211, 231, 253)'
  );
  expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
});
