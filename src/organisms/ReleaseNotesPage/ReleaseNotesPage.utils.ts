import { ReleaseNote } from '@equinor/subsurface-app-management';

import { sortByDate } from 'src/atoms/utils/sort';

interface MonthData {
  label: string;
  value: Date;
}

interface YearData {
  label: string;
  value: string;
  months: MonthData[];
}

export const extractYearsData = (
  getReleaseNoteList: ReleaseNote[]
): YearData[] => {
  const years: YearData[] = [];

  for (const note of getReleaseNoteList) {
    const releaseDate = new Date(note.releaseDate ?? note.createdDate);
    const yearLabel = releaseDate.toLocaleString('en-US', {
      year: 'numeric',
    });
    const yearValue = releaseDate.toLocaleString('en-US', {
      year: 'numeric',
    });

    const existingYear = years.find((year) => year.value === yearValue);
    if (!existingYear) {
      const year: YearData = {
        label: yearLabel,
        value: yearValue,
        months: [],
      };
      years.push(year);
    }

    const [monthLabel, monthYear] = releaseDate
      .toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      })
      .split(' ');
    const monthValue = new Date(`1. ${monthLabel} ${monthYear}`);

    const foundYear = years.find((year) => year.value === yearValue);
    if (foundYear) {
      const existingMonth = foundYear.months.find(
        (month) => month.value.toISOString() === monthValue.toISOString()
      );
      if (!existingMonth) {
        foundYear.months.push({
          label: monthLabel,
          value: monthValue,
        });
      }
      foundYear.months.sort((a, b) => {
        return sortByDate(a.value, b.value);
      });
    }
  }

  years.sort((a, b) => {
    const yearA = Number.parseInt(a.value);
    const yearB = Number.parseInt(b.value);
    return yearB - yearA;
  });

  return years;
};

export function monthValueToString(monthValue: Date): string {
  return `${monthValue.toLocaleDateString('en-GB', {
    month: 'long',
  })}_${monthValue.getFullYear()}`.toLowerCase();
}

export function yearId(yearValue: string): string {
  return `year-${yearValue}`;
}

export function removeFromPreviousByIndex<T extends unknown[]>(
  prev: T | undefined,
  index: number
): T {
  const copy = structuredClone(prev ?? []);
  copy.splice(index, 1);
  return copy as T;
}
