import {
  SelectOption,
  SelectOptionRequired,
} from 'src/molecules/Select/Select.types';

function filterAutoCompleteOption<T extends SelectOptionRequired>({
  searchValue,
  option,
}: {
  searchValue: string;
  option: SelectOption<T>;
}) {
  if (searchValue === '') return false;
  return option.label.toLowerCase().includes(searchValue.toLowerCase());
}

function getAllAutoCompleteOptions<T extends string>(
  autoCompleteOptions: Record<T, SelectOptionRequired[]>
): Array<SelectOptionRequired & { key: T }> {
  const all: Array<SelectOptionRequired & { key: T }> = [];
  for (const key in autoCompleteOptions) {
    all.push(...autoCompleteOptions[key].map((option) => ({ ...option, key })));
  }
  return all;
}

function sortByMatchPercentage({
  a,
  b,
  searchValue,
}: {
  a: string;
  b: string;
  searchValue: string;
}) {
  const searchToLower = searchValue.toLowerCase();
  const restA = a.toLowerCase().replace(searchToLower, '');
  const restB = b.toLowerCase().replace(searchToLower, '');

  return restA.length - restB.length;
}

export function getFilteredAutoCompleteOptions<T extends string>({
  searchValue,
  autoCompleteOptions,
}: {
  searchValue: string;
  autoCompleteOptions: Record<T, SelectOptionRequired[]>;
}): Array<SelectOptionRequired & { key: T }> {
  return getAllAutoCompleteOptions(autoCompleteOptions)
    .filter((option) => filterAutoCompleteOption({ searchValue, option }))
    .sort((a, b) =>
      sortByMatchPercentage({ a: a.label, b: b.label, searchValue })
    )
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function findStartAndEndIndexOfSearch({
  searchValue,
  label,
}: {
  searchValue: string;
  label: string;
}): [number, number] {
  const startIndex = label.toLowerCase().indexOf(searchValue.toLowerCase());
  return [startIndex, startIndex + searchValue.length - 1];
}
