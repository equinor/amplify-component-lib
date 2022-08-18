import date from 'src/utils/date';
import { faker } from '@faker-js/faker';

test('formatDate works as expected with default format', () => {
  const fakeDate = faker.date.past();

  const formattedDate = date.formatDate(fakeDate);

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear();
  expect(formattedDate).toBe(
    `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
  );
});

test('formatDate works as expected with format = "DD. month YYYY"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = date.formatDate(fakeDate, {
    format: 'DD. month YYYY',
  });

  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const testFormatted = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
  })}`;

  expect(formattedDate).toBe(testFormatted);
});

test('formatDate works as expected with format = "YYYY-MM-DD"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = date.formatDate(fakeDate, {
    format: 'YYYY-MM-DD',
  });

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear();
  expect(formattedDate).toBe(`${year}-${month}-${day}`);
});

test('formatDateTime works as expected', () => {
  const fakeDate = faker.date.past();
  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResult = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = date.formatDateTime(fakeDate);
  expect(formatted).toBe(expectedResult);
});

test('formatDateTime works as expected with options', () => {
  const fakeDate = faker.date.past();
  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResult = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = date.formatDateTime(fakeDate, {
    month: 'short',
  });
  expect(formatted).toBe(expectedResult);
});

test('formatRelativeDateTime work as expected with yesterdays date', () => {
  const fakeDate = new Date();
  fakeDate.setDate(fakeDate.getDate() - 1);
  // Fake date is yesterday;

  const formatted = date.formatRelativeDateTime(fakeDate);
  expect(formatted).toContain('Yesterday');
});

test('formatRelativeDateTime work as expected with yesterdays date, but less than 24 hours', () => {
  const fakeDate = new Date();
  fakeDate.setHours(fakeDate.getHours() - fakeDate.getHours() - 2);
  // Fake date is yesterday;

  const formatted = date.formatRelativeDateTime(fakeDate);
  expect(formatted).toContain('Yesterday');
});

test('formatRelativeDateTime work as expected with date older than yesterday, but not more than 1 week old', () => {
  const TwoDaysAgo = new Date().setDate(new Date().getDate() - 2);
  const fakeDate = faker.date.recent(5, TwoDaysAgo);
  // Fake date is not yesterday, but a date within a week of today

  const fakeDateDay = fakeDate.toLocaleString('en-GB', {
    weekday: 'long',
  });

  const formatted = date.formatRelativeDateTime(fakeDate);
  expect(formatted).toContain(fakeDateDay);
});

test('formatRelativeDateTime works as expected with date older than a week', () => {
  const fakeDate = faker.date.past(10);
  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResult = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = date.formatRelativeDateTime(fakeDate);
  expect(formatted).toBe(expectedResult);
});

test('formatRelativeDateTime works as expected with todays date', () => {
  const today = new Date();
  const past = new Date();
  past.setHours(today.getHours() - 2);

  const expectedResult = `Today at ${past.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = date.formatRelativeDateTime(past);
  expect(formatted).toEqual(expectedResult);
});

test('isBetweenDates works as expected with todays date between yesterday and tomorrow', () => {
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const formatted = date.isBetweenDates(today, [yesterday, tomorrow]);
  expect(formatted).toEqual(true);
});

test('isBetweenDates works as expected with todays date between itself', () => {
  const today = new Date();

  const formatted = date.isBetweenDates(today, [today, today]);
  expect(formatted).toEqual(true);
});
