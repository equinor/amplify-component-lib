import { ReleaseNote } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';

import { extractYearsData } from './ReleaseNotesPage.utils';

test('extractYearsData - expected years', async () => {
  const releaseNotes: ReleaseNote[] = Array.from({ length: 5 }).map(() => ({
    releaseId: faker.string.uuid(),
    applicationName: faker.book.author(),
    title: faker.book.title(),
    body: faker.book.series(),
    draft: false,
    createdDate: faker.date.past({ years: 3 }).toISOString(),
  }));

  const expectedYears = new Set(
    releaseNotes.map(({ createdDate }) => new Date(createdDate).getFullYear())
  );

  const yearData = extractYearsData(releaseNotes);

  for (const year of expectedYears) {
    expect(yearData.find((y) => y.value === year.toString())).toBeDefined();
  }
});
