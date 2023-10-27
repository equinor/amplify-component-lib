type MonthData = {
  label: string;
  value: Date;
};

type YearData = {
  label: string;
  value: string;
  months: MonthData[];
};

export const extractYearsData = (getReleaseNoteList: any[]): YearData[] => {
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

export function monthValueToString(monthValue: Date): string {
  return `${monthValue.toLocaleDateString('en-GB', {
    month: 'long',
  })}_${monthValue.getFullYear()}`.toLowerCase();
}

export function monthToString(monthValue: Date) {
  return `${monthValue.toLocaleDateString('en-GB', {
    month: 'long',
  })}`;
}

export function yearValueToString(yearValue: Date): string {
  return `year-${yearValue.toLocaleDateString('en-GB', {
    year: 'numeric',
  })}`;
}
