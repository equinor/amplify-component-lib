import { ReleaseNote } from 'src/api/models/ReleaseNote';
import { TableOfContentsItemType } from 'src/providers/TableOfContentsProvider';

interface MonthData {
  label: string;
  value: Date;
}

interface YearData {
  label: string;
  value: string;
  months: MonthData[];
}

const extractDatesFromReleaseNotes = (
  releaseNotes: ReleaseNote[]
): TableOfContentsItemType[] => {
  const pageMenuItemFormattedNotes: TableOfContentsItemType[] = [];

  const releaseNotesWithDate = releaseNotes.filter((n) => n.createdDate);

  const releaseNotesDates = releaseNotesWithDate.map((n) => {
    const date = new Date(n.createdDate!);

    return { date, year: date.getFullYear(), month: date.getMonth() };
  });

  for (const note of releaseNotesWithDate) {
    const createdDate = new Date(note.createdDate!);
    const yearLabel = createdDate.toLocaleString('en-US', {
      year: 'numeric',
    });
    const yearValue = `year${createdDate.toLocaleString('en-US', {
      year: 'numeric',
    })}`;
    // Check if the year already exists, move on if it does
    const existingYear = pageMenuItemFormattedNotes.find(
      (p) => p.value === yearValue
    );
    if (existingYear) {
      continue;
    }

    const matchingDatesOnYear = releaseNotesDates.filter(
      (d) => d.year === createdDate.getFullYear()
    );

    const uniqueMonths = [
      ...new Map(matchingDatesOnYear.map((m) => [m.month, m])).values(),
    ];

    uniqueMonths.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

    const months = uniqueMonths.map((d) => {
      const monthLabel = d.date.toLocaleString('en-US', {
        month: 'long',
      });
      const monthValue = `${yearValue}--${monthLabel}`;
      return {
        label: monthLabel,
        value: monthValue,
      };
    });

    pageMenuItemFormattedNotes.push({
      label: yearLabel,
      value: yearValue,
      children: months,
    });
  }

  pageMenuItemFormattedNotes.sort((a, b) => {
    const yearA = parseInt(a.label);
    const yearB = parseInt(b.label);
    return yearB - yearA;
  });

  return pageMenuItemFormattedNotes;
};

const monthValueToString = (monthValue: Date) => {
  return `year${monthValue.getFullYear()}--${monthValue.toLocaleDateString(
    'en-GB',
    {
      month: 'long',
    }
  )}`;
};

const monthToString = (monthValue: Date) => {
  return `${monthValue.toLocaleDateString('en-GB', {
    month: 'long',
  })}`;
};

const yearValueToString = (yearValue: Date) => {
  return `year${yearValue.toLocaleDateString('en-GB', {
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
  extractDatesFromReleaseNotes,
  monthToString,
  monthValueToString,
  sortReleaseNotesByDate,
  yearValueToString,
};
