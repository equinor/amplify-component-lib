import { RefObject } from 'react';

import { Menu } from '@equinor/eds-core-react';

import { FilterWithAutoCompleteOptions } from 'src/organisms/Filter/Filter.types';

type AutoCompleteMenuProps<T extends string> = {
  ref: RefObject<HTMLDivElement | null>;
  search: string;
  anchorEl: HTMLElement | null;
} & Pick<
  FilterWithAutoCompleteOptions<T>,
  'autoCompleteOptions' | 'onAutoComplete'
>;

export function AutoCompleteMenu<T extends string>({
  ref,
  search,
  anchorEl,
  autoCompleteOptions,
  onAutoComplete,
}: AutoCompleteMenuProps<T>) {
  const matches = Object.keys(autoCompleteOptions).flatMap((key) =>
    autoCompleteOptions[key as keyof typeof autoCompleteOptions]
      .filter(
        (option) =>
          search !== '' &&
          option.label.toLowerCase().includes(search.toLowerCase())
      )
      .map((item) => ({ key: key as T, ...item }))
  );

  if (search === '' || !anchorEl || matches.length === 0) return null;

  return (
    <Menu ref={ref} open anchorEl={anchorEl} matchAnchorWidth>
      {matches.map((match) => (
        <Menu.Item
          key={match.label + match.key}
          onClick={() => onAutoComplete(match.key, match)}
        >
          {match.label}
        </Menu.Item>
      ))}
    </Menu>
  );
}
