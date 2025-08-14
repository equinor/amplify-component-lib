import { Typography } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';
import { FilterWithAutoCompleteOptions } from 'src/organisms/Filter/Filter.types';
import {
  findStartAndEndIndexOfSearch,
  getFilteredAutoCompleteOptions,
} from 'src/organisms/Filter/Filter.utils';

import { styled } from 'styled-components';

export const StyledTypography = styled(Typography)`
  position: absolute;
  left: 0;
  color: ${colors.text.static_icons__tertiary.rgba};
  height: fit-content;
  text-wrap: nowrap;
  line-height: normal;
  > span {
    color: transparent;
  }
`;

interface AutoCompleteTextProps<T extends string> {
  search: string;
  autoCompleteOptions: FilterWithAutoCompleteOptions<T>['autoCompleteOptions'];
}

export function AutoCompleteText<T extends string>({
  search,
  autoCompleteOptions,
}: AutoCompleteTextProps<T>) {
  const filteredOptions = getFilteredAutoCompleteOptions({
    autoCompleteOptions,
    searchValue: search,
  });

  if (filteredOptions.length === 0) return null;

  const item = filteredOptions[0];
  const [startIndex, endIndex] = findStartAndEndIndexOfSearch({
    searchValue: search,
    label: item.label,
  });

  if (startIndex !== 0) return null;

  return (
    <StyledTypography>
      <span>{search.slice(0, search.length)}</span>
      {item.label.slice(endIndex + 1)}
    </StyledTypography>
  );
}
