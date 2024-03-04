function sortByDate(a: Date | string, b: Date | string): number {
  const firstDate = typeof a === 'string' ? new Date(a) : a;
  const secondDate = typeof b === 'string' ? new Date(b) : b;

  if (firstDate > secondDate) return -1;
  else if (firstDate < secondDate) return 1;
  return 0;
}

interface WellBore {
  wellboreName?: string | null;
}

function sortByWellboreName(
  a: string | WellBore,
  b: string | WellBore
): number {
  const firstWellbore = typeof a === 'string' ? a : a.wellboreName;
  const secondWellbore = typeof b === 'string' ? b : b.wellboreName;

  if (firstWellbore && secondWellbore) {
    return firstWellbore.localeCompare(secondWellbore, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  }
  return 0;
}

export default { sortByDate, sortByWellboreName };
