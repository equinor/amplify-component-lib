function sortByDate(a: Date | string, b: Date | string): number {
  const firstDate = typeof a === 'string' ? new Date(a) : a;
  const secondDate = typeof b === 'string' ? new Date(b) : b;

  if (firstDate > secondDate) return -1;
  else if (firstDate < secondDate) return 1;
  return 0;
}

export default { sortByDate };
