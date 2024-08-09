import { faker } from '@faker-js/faker';

import { sortByDate, sortByWellboreName } from './sort';

test('sortByDate works as expected with date objects', () => {
  const listOfFakeDates: Date[] = faker.date
    .betweens({
      from: '2000',
      to: '2022',
      count: faker.number.int({ min: 10, max: 50 }),
    })
    .map((item) => new Date(item));

  const sortedList = listOfFakeDates.sort(sortByDate);

  for (let i = 1; i < sortedList.length - 1; i++) {
    const firstDate = sortedList[i - 1];
    const secondDate = sortedList[i];
    expect(sortByDate(firstDate, secondDate)).toBe(-1);
    expect(sortByDate(secondDate, firstDate)).toBe(1);
    expect(sortByDate(firstDate, firstDate)).toBe(0);
  }
});

test('sortByDate works as expected with strings', () => {
  const listOfFakeDates: string[] = faker.date
    .betweens({
      from: '2000',
      to: '2022',
      count: faker.number.int({ min: 10, max: 50 }),
    })
    .map((item: Date) => item.toISOString());

  const sortedList = listOfFakeDates.sort(sortByDate);

  for (let i = 1; i < sortedList.length - 1; i++) {
    const firstDate = new Date(sortedList[i - 1]);
    const secondDate = new Date(sortedList[i]);
    expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
  }
});

const allWellbores = [
  {
    wellboreName: 'NO 16/2-D-32 T2',
  },
  {
    wellboreName: 'NO 16/2-D-2 T3',
  },
  {
    wellboreName: 'NO 16/3-P-1 HT2',
  },
  {
    wellboreName: 'NO 16/3-O-2 HT3',
  },
  {
    wellboreName: 'NO 16/3-U-1',
  },
  {
    wellboreName: 'NO 16/2-G-3 H',
  },
  {
    wellboreName: 'NO 16/2-D-5',
  },
  {
    wellboreName: 'NO 16/2-D-23',
  },
  {
    wellboreName: 'NO 16/2-D-19',
  },
  {
    wellboreName: 'NO 16/2-D-8',
  },
  {
    wellboreName: 'NO 16/2-17 S',
  },
  {
    wellboreName: 'NO 16/2-D-16',
  },
  {
    wellboreName: 'NO 16/3-U-1 B',
  },
  {
    wellboreName: 'NO 16/2-D-11 T2',
  },
  {
    wellboreName: 'NO 16/2-6',
  },
  {
    wellboreName: 'NO 16/2-7 A',
  },
  {
    wellboreName: 'NO 16/2-D-10 T3',
  },
  {
    wellboreName: 'NO 16/2-D-1',
  },
  {
    wellboreName: 'NO 16/3-U-20',
  },
];

const correctlySortedWellbores = [
  {
    wellboreName: 'NO 16/2-6',
  },
  {
    wellboreName: 'NO 16/2-7 A',
  },
  {
    wellboreName: 'NO 16/2-17 S',
  },
  {
    wellboreName: 'NO 16/2-D-1',
  },
  {
    wellboreName: 'NO 16/2-D-2 T3',
  },
  {
    wellboreName: 'NO 16/2-D-5',
  },
  {
    wellboreName: 'NO 16/2-D-8',
  },
  {
    wellboreName: 'NO 16/2-D-10 T3',
  },
  {
    wellboreName: 'NO 16/2-D-11 T2',
  },
  {
    wellboreName: 'NO 16/2-D-16',
  },
  {
    wellboreName: 'NO 16/2-D-19',
  },
  {
    wellboreName: 'NO 16/2-D-23',
  },
  {
    wellboreName: 'NO 16/2-D-32 T2',
  },
  {
    wellboreName: 'NO 16/2-G-3 H',
  },
  {
    wellboreName: 'NO 16/3-O-2 HT3',
  },
  {
    wellboreName: 'NO 16/3-P-1 HT2',
  },
  {
    wellboreName: 'NO 16/3-U-1',
  },
  {
    wellboreName: 'NO 16/3-U-1 B',
  },
  {
    wellboreName: 'NO 16/3-U-20',
  },
];

test('sortByWellboreName works with wellbore objects', () => {
  const sortedWellbores = allWellbores.sort(sortByWellboreName);

  for (const [index, wellbore] of sortedWellbores.entries()) {
    expect(wellbore.wellboreName).toBe(
      correctlySortedWellbores[index].wellboreName
    );
  }
});

test('sortByWellboreName works with wellbore strings', () => {
  const allStrings = allWellbores.map((wellbore) => wellbore.wellboreName);
  const correctlySortedStrings = correctlySortedWellbores.map(
    (wellbore) => wellbore.wellboreName
  );
  const sortedWellbores = allStrings.sort(sortByWellboreName);

  for (const [index, wellbore] of sortedWellbores.entries()) {
    expect(wellbore).toBe(correctlySortedStrings[index]);
  }
});

test('sortByWellboreName works with undefined wellboreName', () => {
  const wellBore = correctlySortedWellbores[0];
  const undefinedNameWellbore = { wellboreName: undefined };

  expect(sortByWellboreName(wellBore, undefinedNameWellbore)).toBe(0);
});
