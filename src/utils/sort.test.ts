import { faker } from '@faker-js/faker';
import sort from 'src/utils/sort';

test('sortByDate works as expected with date objects', () => {
  const listOfFakeDates: Date[] = faker.date
    .betweens('2000', '2022', Number(faker.random.numeric(2)))
    .map((item) => new Date(item));

  const sortedList = listOfFakeDates.sort(sort.sortByDate);

  for (let i = 1; i < sortedList.length - 1; i++) {
    const firstDate = sortedList[i - 1];
    const secondDate = sortedList[i];
    expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
  }
});

test('sortByDate works as expected with strings', () => {
  const listOfFakeDates: string[] = faker.date
    .betweens('2000', '2022', Number(faker.random.numeric(2)))
    .map((item: Date) => item.toISOString());

  const sortedList = listOfFakeDates.sort(sort.sortByDate);

  for (let i = 1; i < sortedList.length - 1; i++) {
    const firstDate = new Date(sortedList[i - 1]);
    const secondDate = new Date(sortedList[i]);
    expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
  }
});
