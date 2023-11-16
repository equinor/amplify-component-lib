import { ReleaseNote } from 'src/api/models/ReleaseNote';

interface MonthData {
  label: string;
  value: Date;
}

interface YearData {
  label: string;
  value: string;
  months: MonthData[];
}

const extractYearsData = (getReleaseNoteList: any[]): YearData[] => {
  const years: YearData[] = [];

  for (const note of getReleaseNoteList) {
    const createdDate = new Date(note.createdDate);
    const yearLabel = createdDate.toLocaleString('en-US', {
      year: 'numeric',
    });
    const yearValue = createdDate.toLocaleString('en-US', {
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

    const monthLabel = createdDate.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    const monthValue = new Date(monthLabel);

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
        const dateA = new Date(a.value);
        const dateB = new Date(b.value);
        return dateB.getTime() - dateA.getTime();
      });
    }
  }

  years.sort((a, b) => {
    const yearA = parseInt(a.value);
    const yearB = parseInt(b.value);
    return yearB - yearA;
  });

  return years;
};

const monthValueToString = (monthValue: Date) => {
  return `${monthValue.toLocaleDateString('en-GB', {
    month: 'long',
  })}_${monthValue.getFullYear()}`.toLowerCase();
};

const monthToString = (monthValue: Date) => {
  return `${monthValue.toLocaleDateString('en-GB', {
    month: 'long',
  })}`;
};

const yearValueToString = (yearValue: Date) => {
  return `year-${yearValue.toLocaleDateString('en-GB', {
    year: 'numeric',
  })}`;
};

const sortReleaseNotesByDate = (notes: ReleaseNote[]) => {
  return notes.sort((a, b) => {
    const dateA = new Date(a.createdDate ?? '').getTime();
    const dateB = new Date(b.createdDate ?? '').getTime();
    const numberDateA = !Number.isNaN(dateA) ? dateA : 0;
    const numberDateB = !Number.isNaN(dateB) ? dateB : 0;
    return numberDateB - numberDateA;
  });
};

export type { MonthData, YearData };
export {
  extractYearsData,
  monthToString,
  monthValueToString,
  sortReleaseNotesByDate,
  yearValueToString,
};
