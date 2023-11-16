import {
  extractYearsData,
  monthToString,
  monthValueToString,
  sortReleaseNotesByDate,
  yearValueToString,
} from './releaseNotes';

const dateObject = new Date('2023-06-29T10:50:22.8210567+00:00');
const dates = [
  { createdDate: '2023-06-29T10:50:22.8210567+00:00' },
  { createdDate: '2022-06-29T10:50:22.8210567+00:00' },
  { createdDate: '2022-05-29T10:50:22.8210567+00:00' },
];

const notes = [
  { createdDate: '2023-06-29' },
  { createdDate: '2020-06-29' },
  { createdDate: '2022-06-29' },
  {},
  {},
];

describe('release notes utils', () => {
  test('extract years and months from list containing createdDate attribute', () => {
    const expectedYear = '2023';
    const expectedMonthAndYear = 'June 2023';
    const actual = extractYearsData(dates);
    expect(actual[0].label).toEqual(expectedYear);
    expect(actual[0].months[0].label).toEqual(expectedMonthAndYear);
  });

  test('transform date to month string', () => {
    const expectedYear = 'June';
    const actual = monthToString(dateObject);
    console.log({ actual });
    expect(actual).toEqual(expectedYear);
  });
  test('transform date to a string in the format of month_year: june_2023', () => {
    const expectedYear = 'june_2023';
    const actual = monthValueToString(dateObject);
    console.log({ actual });
    expect(actual).toEqual(expectedYear);
  });
  test('transform date to string formatted with a year_ prefix to the year: year-2023', () => {
    const expectedYear = 'year-2023';
    const actual = yearValueToString(dateObject);
    console.log({ actual });
    expect(actual).toEqual(expectedYear);
  });

  test('sort release notes by created date in descending order', () => {
    const sorted = sortReleaseNotesByDate(notes);
    const expected = [
      { createdDate: '2023-06-29' },
      { createdDate: '2022-06-29' },
      { createdDate: '2020-06-29' },
      {},
      {},
    ];
    expect(sorted).toStrictEqual(expected);
  });
});
