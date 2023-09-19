import { faker } from '@faker-js/faker';

import date from './date';

test('formatDate works as expected when not sending in a date', () => {
  const formattedDate = date.formatDate(null);

  expect(formattedDate).toBe('');
});

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

test('formatDate works as expected with default format that needs to be padded', () => {
  const fakeDate = new Date('01.01.23');

  const formattedDate = date.formatDate(fakeDate);

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear();
  expect(formattedDate).toBe(
    `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
  );
});

test('formatDate works as expected with default format that does not need  to be padded', () => {
  const fakeDate = new Date('10.10.23');

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
  expect(formattedDate).toBe(
    `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  );
});

test('formatDate works as expected with format = "DD.MM.YY"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = date.formatDate(fakeDate, {
    format: 'DD.MM.YY',
  });

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear().toString().slice(-2);
  expect(formattedDate).toBe(
    `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
  );
});

test('formatDate works as expected with format = "DD.MM.YY" when date needs to be padded', () => {
  const fakeDate = new Date('01.01.23');

  const formattedDate = date.formatDate(fakeDate, {
    format: 'DD.MM.YY',
  });

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear().toString().slice(-2);
  expect(formattedDate).toBe(
    `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
  );
});

test('formatDate works as expected with format = "DD.MM.YY" when date does not need to be padded', () => {
  const fakeDate = new Date('10.10.23');

  const formattedDate = date.formatDate(fakeDate, {
    format: 'DD.MM.YY',
  });

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear().toString().slice(-2);
  expect(formattedDate).toBe(
    `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
  );
});

test('formatDate works as expected with format = "DD. month"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = date.formatDate(fakeDate, {
    format: 'DD. month',
  });

  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const testFormatted = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'long',
  })}`;

  expect(formattedDate).toBe(testFormatted);
});

test('formatDate works as expected with format = "DD. month" and month = "short"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = date.formatDate(fakeDate, {
    format: 'DD. month',
    month: 'short',
  });

  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const testFormatted = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'short',
  })}`;

  expect(formattedDate).toBe(testFormatted);
});

test('formatDateTime works as expected', () => {
  const today = new Date();
  const fakeDate = faker.date.past({
    refDate: today.setDate(today.getDate() - 2),
  });
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

test('formatDateTime works as expected when not sending in a date', () => {
  const formatted = date.formatDateTime(null);
  expect(formatted).toBe('');
});

test('formatDateTime works as expected with options', () => {
  const today = new Date();
  const fakeDate = faker.date.past({
    refDate: today.setDate(today.getDate() - 2),
  });
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

test('formatDateTime works as expected when isGMT is set', () => {
  const fakeDate = faker.date.past();
  const inputDate = new Date(fakeDate.getTime());
  fakeDate.setTime(fakeDate.getTime() + fakeDate.getTimezoneOffset() * 60000);
  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResult = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = date.formatDateTime(inputDate, { isGMT: true });
  expect(formatted).toBe(expectedResult);
});

test('formatRelativeDateTime with null should be empty string', () => {
  const formatted = date.formatRelativeDateTime(null);
  expect(formatted).toContain('');
});

test('formatRelativeDateTime with isGMT set should convert to local time', () => {
  const fakeDate = new Date();
  fakeDate.setDate(fakeDate.getDate() - 1);

  const inputDate = new Date(fakeDate.getTime());
  fakeDate.setTime(fakeDate.getTime() + fakeDate.getTimezoneOffset() * 60000);

  const time = fakeDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formatted = date.formatRelativeDateTime(inputDate, true);
  expect(formatted).toContain(time);
});

test('formatRelativeDateTime with todays date should display as Today including time', () => {
  const twoHoursAgo = new Date();
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

  const expectedResult = `Today at ${twoHoursAgo.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = date.formatRelativeDateTime(twoHoursAgo);
  expect(formatted).toEqual(expectedResult);
});

test('formatRelativeDateTime with yesterdays date should display as Yesterday including time', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formattedYesterday = date.formatRelativeDateTime(yesterday);
  expect(formattedYesterday).toContain('Yesterday');

  const yesterdayLessThan24Hours = new Date();
  yesterdayLessThan24Hours.setHours(
    yesterdayLessThan24Hours.getHours() -
      yesterdayLessThan24Hours.getHours() -
      2
  );

  const formatted = date.formatRelativeDateTime(yesterdayLessThan24Hours);
  expect(formatted).toContain('Yesterday');
});

test('formatRelativeDateTime with tomorrows date should display as Tomorrow including time', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedTomorrow = date.formatRelativeDateTime(tomorrow);
  expect(formattedTomorrow).toContain('Tomorrow');

  const tomorrowLessThan24Hours = new Date(tomorrow);
  tomorrowLessThan24Hours.setHours(0);

  const formatted = date.formatRelativeDateTime(tomorrowLessThan24Hours);
  expect(formatted).toContain('Tomorrow');
});

test('formatRelativeDateTime with date within next week should display as weekday + time', () => {
  const dateInNextWeek = new Date();
  dateInNextWeek.setDate(dateInNextWeek.getDate() + 6);

  const weekday = dateInNextWeek.toLocaleString('en-GB', {
    weekday: 'long',
  });

  const formatted = date.formatRelativeDateTime(dateInNextWeek);
  expect(formatted).toContain(weekday);
});

test('formatRelativeDateTime with date before yesterday should display as full date not including year', () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const dayNumeric = threeDaysAgo.toLocaleDateString('en-GB', {
    day: 'numeric',
  });
  const expectedResultThreeDaysAgo = `${dayNumeric}. ${threeDaysAgo.toLocaleString(
    'en-GB',
    {
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }
  )}`;

  const formattedThreeDaysAgo = date.formatRelativeDateTime(threeDaysAgo);
  expect(formattedThreeDaysAgo).toBe(expectedResultThreeDaysAgo);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const day = oneWeekAgo.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResultOneWeekAgo = `${day}. ${oneWeekAgo.toLocaleString(
    'en-GB',
    {
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }
  )}`;

  const formattedOneWeekAgo = date.formatRelativeDateTime(oneWeekAgo);
  expect(formattedOneWeekAgo).toBe(expectedResultOneWeekAgo);
});

test('formatRelativeDateTime with date after next week displays as full date not including year', () => {
  const afterNextWeek = new Date();
  afterNextWeek.setDate(afterNextWeek.getDate() + 8);
  const day = afterNextWeek.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResult = `${day}. ${afterNextWeek.toLocaleString('en-GB', {
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = date.formatRelativeDateTime(afterNextWeek);
  expect(formatted).toBe(expectedResult);
});

test('formatRelativeDateTime with date not in current year displays as full date including year', () => {
  const lastDayOfPreviousYear = new Date();
  lastDayOfPreviousYear.setFullYear(
    lastDayOfPreviousYear.getFullYear() - 1,
    11,
    31
  );
  const fakeDateBeforeCurrentYear = faker.date.past({
    years: 10,
    refDate: lastDayOfPreviousYear,
  });
  const dayOfMonth = fakeDateBeforeCurrentYear.toLocaleDateString('en-GB', {
    day: 'numeric',
  });
  const expectedPreviousYearResult = `${dayOfMonth}. ${fakeDateBeforeCurrentYear.toLocaleString(
    'en-GB',
    {
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  )}`;

  const formattedDateInPreviousYear = date.formatRelativeDateTime(
    fakeDateBeforeCurrentYear
  );
  expect(formattedDateInPreviousYear).toBe(expectedPreviousYearResult);

  const firstDayOfNextYear = new Date();
  firstDayOfNextYear.setFullYear(firstDayOfNextYear.getFullYear() + 1, 0, 1);
  const fakeDateAfterCurrentYear = faker.date.future({
    years: 10,
    refDate: firstDayOfNextYear,
  });
  const day = fakeDateAfterCurrentYear.toLocaleDateString('en-GB', {
    day: 'numeric',
  });
  const expectedNextYearResult = `${day}. ${fakeDateAfterCurrentYear.toLocaleString(
    'en-GB',
    {
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  )}`;

  const formattedDateInNextYear = date.formatRelativeDateTime(
    fakeDateAfterCurrentYear
  );
  expect(formattedDateInNextYear).toBe(expectedNextYearResult);
});

test('isBetweenDates works as expected with null', () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const formatted = date.isBetweenDates(null, [yesterday, tomorrow]);
  expect(formatted).toEqual(false);
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
