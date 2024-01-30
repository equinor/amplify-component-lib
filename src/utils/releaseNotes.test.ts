import {
  extractDatesFromReleasNotes,
  monthToString,
  monthValueToString,
  sortReleaseNotesByDate,
  yearValueToString,
} from './releaseNotes';

const dateObject = new Date('2023-06-29T10:50:22.8210567+00:00');
const dates = [
  { createdDate: '2022-06-29T10:50:22.8210567+00:00' },
  { createdDate: '2022-01-13T10:50:22.8210567+00:00' },
  { createdDate: '2022-07-20T10:50:22.8210567+00:00' },
  { createdDate: '2023-06-29T10:50:22.8210567+00:00' },
  { createdDate: '2022-05-29T10:50:22.8210567+00:00' },
];

const notes = [
  { createdDate: '2023-06-29' },
  { createdDate: '2020-06-29' },
  { createdDate: '2022-06-29' },
  { createdDate: '2023-01-17' },
  { createdDate: '2022-08-31' },
  { createdDate: undefined },
  { createdDate: undefined },
];

describe('release notes utils', () => {
  test('extract years and months from list containing createdDate attribute', () => {
    const expectedYear = '2023';
    const expectedMonth = 'June';
    const actual = extractDatesFromReleasNotes(dates);
    expect(actual[0].label).toEqual(expectedYear);
    expect((actual[0].children || [])[0].label).toEqual(expectedMonth);
  });

  test('should sort years and months in page menu descending', () => {
    const expectedYearOrder = ['2023', '2022'];
    const expectedMonthOrder = ['July', 'June', 'May', 'January'];
    const actual = extractDatesFromReleasNotes(dates);
    const months = actual[1].children || [];
    console.log(`Sorted: ${months.map((c) => c.label).join(', ')}`);

    expect(actual[0].label).toEqual(expectedYearOrder[0]);
    expect(actual[1].label).toEqual(expectedYearOrder[1]);
    expect((actual[1].children || [])[0].label).toEqual(expectedMonthOrder[0]);
    expect((actual[1].children || [])[1].label).toEqual(expectedMonthOrder[1]);
    expect((actual[1].children || [])[2].label).toEqual(expectedMonthOrder[2]);
    expect((actual[1].children || [])[3].label).toEqual(expectedMonthOrder[3]);
  });

  test('transform date to month string', () => {
    const expectedYear = 'June';
    const actual = monthToString(dateObject);
    console.log({ actual });
    expect(actual).toEqual(expectedYear);
  });
  test('transform date to a string in the format of month_year: year2023--June', () => {
    const expectedYear = 'year2023--June';
    const actual = monthValueToString(dateObject);
    console.log({ actual });
    expect(actual).toEqual(expectedYear);
  });
  test('transform date to string formatted with a year_ prefix to the year: year2023', () => {
    const expectedYear = 'year2023';
    const actual = yearValueToString(dateObject);
    console.log({ actual });
    expect(actual).toEqual(expectedYear);
  });

  test('sort release notes by created date in descending order', () => {
    const sorted = sortReleaseNotesByDate(notes);
    const expected = [
      { createdDate: '2023-06-29' },
      { createdDate: '2023-01-17' },
      { createdDate: '2022-08-31' },
      { createdDate: '2022-06-29' },
      { createdDate: '2020-06-29' },
      { createdDate: undefined },
      { createdDate: undefined },
    ];
    expect(sorted).toStrictEqual(expected);
  });
});
