import { faker } from '@faker-js/faker';

import {
  formatDate,
  formatDateTime,
  formatRelativeDateTime,
  isBetweenDates,
} from './date';

test('formatDate works as expected when not sending in a date', () => {
  const formattedDate = formatDate(null);

  expect(formattedDate).toBe(undefined);
});

test('formatDate works as expected with default format', () => {
  const fakeDate = faker.date.past();

  const formattedDate = formatDate(fakeDate);

  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const testFormatted = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
  })}`;

  expect(formattedDate).toBe(testFormatted);
});

test('formatDate works as expected with format = "DD.MM.YYYY"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = formatDate(fakeDate, { format: 'DD.MM.YYYY' });

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear();
  expect(formattedDate).toBe(
    `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
  );
});

test('formatDate works as expected with format = "DD.MM.YYYY" that needs to be padded', () => {
  const fakeDate = new Date('01.01.23');

  const formattedDate = formatDate(fakeDate, { format: 'DD.MM.YYYY' });

  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const year = fakeDate.getFullYear();
  expect(formattedDate).toBe(
    `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
  );
});

test('formatDate works as expected with format = "DD. month YYYY"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = formatDate(fakeDate, {
    format: 'DD. month YYYY',
  });

  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const testFormatted = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
  })}`;

  expect(formattedDate).toBe(testFormatted);
});

test('formatDate works as expected with format = "DD. month YYYY" and month = short', () => {
  const fakeDate = faker.date.past();

  const formattedDate = formatDate(fakeDate, {
    format: 'DD. month YYYY',
    month: 'short',
  });

  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const testFormatted = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'short',
    year: 'numeric',
  })}`;

  expect(formattedDate).toBe(testFormatted);
});

test('formatDate works as expected with format = "YYYY-MM-DD"', () => {
  const fakeDate = faker.date.past();

  const formattedDate = formatDate(fakeDate, {
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

  const formattedDate = formatDate(fakeDate, {
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

  const formattedDate = formatDate(fakeDate, {
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

  const formattedDate = formatDate(fakeDate, {
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

  const formattedDate = formatDate(fakeDate, {
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

  const formattedDate = formatDate(fakeDate, {
    format: 'DD. month',
    month: 'short',
  });

  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const testFormatted = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month: 'short',
  })}`;

  expect(formattedDate).toBe(testFormatted);
});

test('formatDate with null should be undefined', () => {
  const formatted = formatDate(null);
  expect(formatted).toBe(undefined);
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

  const formatted = formatDateTime(fakeDate);
  expect(formatted).toBe(expectedResult);
});

test('formatDateTime works as expected when not sending in a date', () => {
  const formatted = formatDateTime(null);
  expect(formatted).toBe(undefined);
});

test.each(['numeric', '2-digit', 'long', 'short', 'narrow'] as Array<
  'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
>)('formatDateTime with month option %s', (month) => {
  const today = new Date();
  const fakeDate = faker.date.past({
    refDate: today.setDate(today.getDate() - 2),
  });
  const day = fakeDate.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResult = `${day}. ${fakeDate.toLocaleString('en-GB', {
    month,
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = formatDateTime(fakeDate, { month });
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

  const formatted = formatDateTime(inputDate, { isGMT: true });
  expect(formatted).toBe(expectedResult);
});

test('formatRelativeDateTime with null should be undefined', () => {
  const formatted = formatRelativeDateTime(null);
  expect(formatted).toBe(undefined);
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
  const formatted = formatRelativeDateTime(inputDate, true);
  expect(formatted).toContain(time);
});

test('formatRelativeDateTime with todays date should display as Today including time', () => {
  const twoHoursAgo = new Date();
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

  const expectedResult = `Today at ${twoHoursAgo.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const formatted = formatRelativeDateTime(twoHoursAgo);
  expect(formatted).toEqual(expectedResult);
});

test('formatRelativeDateTime with yesterdays date should display as Yesterday including time', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formattedYesterday = formatRelativeDateTime(yesterday);
  expect(formattedYesterday).toContain('Yesterday');

  const yesterdayLessThan24Hours = new Date();
  yesterdayLessThan24Hours.setHours(
    yesterdayLessThan24Hours.getHours() -
      yesterdayLessThan24Hours.getHours() -
      2
  );

  const formatted = formatRelativeDateTime(yesterdayLessThan24Hours);
  expect(formatted).toContain('Yesterday');
});

test('formatRelativeDateTime with tomorrows date should display as Tomorrow including time', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedTomorrow = formatRelativeDateTime(tomorrow);
  expect(formattedTomorrow).toContain('Tomorrow');

  const tomorrowLessThan24Hours = new Date(tomorrow);
  tomorrowLessThan24Hours.setHours(0);

  const formatted = formatRelativeDateTime(tomorrowLessThan24Hours);
  expect(formatted).toContain('Tomorrow');
});

test('formatRelativeDateTime with date within next week should display as weekday + time', () => {
  const dateInNextWeek = new Date();
  dateInNextWeek.setDate(dateInNextWeek.getDate() + 6);

  const weekday = dateInNextWeek.toLocaleString('en-GB', {
    weekday: 'long',
  });

  const formatted = formatRelativeDateTime(dateInNextWeek);
  expect(formatted).toContain(weekday);
});

test('formatRelativeDateTime with date before yesterday should display as full date not including year', () => {
  let threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Check if we changed year within a week ago, and sets the check to 1st of jan current year if so
  if (oneWeekAgo.getFullYear() !== new Date().getFullYear()) {
    const firstJanThisYear = new Date(new Date().getFullYear(), 0, 1);
    threeDaysAgo = firstJanThisYear;
    oneWeekAgo = firstJanThisYear;
  }

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

  const formattedThreeDaysAgo = formatRelativeDateTime(threeDaysAgo);
  expect(formattedThreeDaysAgo).toBe(expectedResultThreeDaysAgo);

  const day = oneWeekAgo.toLocaleDateString('en-GB', { day: 'numeric' });
  const expectedResultOneWeekAgo = `${day}. ${oneWeekAgo.toLocaleString(
    'en-GB',
    {
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }
  )}`;

  const formattedOneWeekAgo = formatRelativeDateTime(oneWeekAgo);
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

  const formatted = formatRelativeDateTime(afterNextWeek);
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

  const formattedDateInPreviousYear = formatRelativeDateTime(
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

  const formattedDateInNextYear = formatRelativeDateTime(
    fakeDateAfterCurrentYear
  );
  expect(formattedDateInNextYear).toBe(expectedNextYearResult);
});

test('formatRelativeDateTime with null should be undefined ', () => {
  const formatted = formatDate(null);
  expect(formatted).toBe(undefined);
});

test('isBetweenDates works as expected with null', () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const formatted = isBetweenDates(null, [yesterday, tomorrow]);
  expect(formatted).toEqual(false);
});

test('isBetweenDates works as expected with todays date between yesterday and tomorrow', () => {
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const formatted = isBetweenDates(today, [yesterday, tomorrow]);
  expect(formatted).toEqual(true);
});

test('isBetweenDates works as expected with todays date between itself', () => {
  const today = new Date();

  const formatted = isBetweenDates(today, [today, today]);
  expect(formatted).toEqual(true);
});

test('isBetweenDates works as expected with string date', () => {
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const formatted = isBetweenDates(formatDate(today), [yesterday, tomorrow]);
  expect(formatted).toEqual(true);
});

describe('UTC timestamps', () => {
  const utcDate = '2021-06-30T22:00:00+00:00';
  test('should accept UTC timestamps and get that date back in UTC in the format of DD. month YYYY', () => {
    const formatted = formatDate(utcDate, {
      format: 'DD. month YYYY',
      useUTC: true,
    });
    expect(formatted).toEqual('30. June 2021');
  });
  test('should accept UTC timestamps and get that date back in UTC in the format of DD. month', () => {
    const formatted = formatDate(utcDate, {
      format: 'DD. month',
      useUTC: true,
    });
    expect(formatted).toEqual('30. June');
  });
  test('should accept UTC timestamps and get that date back in UTC in the format of YYYY-MM-DD', () => {
    const formatted = formatDate(utcDate, {
      format: 'YYYY-MM-DD',
      useUTC: true,
    });
    expect(formatted).toEqual('2021-06-30');
  });
  test('should accept UTC timestamps and get that date back in UTC in the format of DD.MM.YY', () => {
    const formatted = formatDate(utcDate, {
      format: 'DD.MM.YY',
      useUTC: true,
    });
    expect(formatted).toEqual('30.06.21');
  });
});
