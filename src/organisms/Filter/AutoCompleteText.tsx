import { Icon, Typography } from '@equinor/eds-core-react';
import { keyboard_tab } from '@equinor/eds-icons';

import { colors, spacings } from 'src/atoms/style';
import { FilterWithAutoCompleteOptions } from 'src/organisms/Filter/Filter.types';
import { getAutoCompleteSuggestion } from 'src/organisms/Filter/Filter.utils';

import { styled } from 'styled-components';

const Wrapper = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
`;

const StyledTypography = styled(Typography)`
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
  const suggestion = getAutoCompleteSuggestion({
    searchValue: search,
    autoCompleteOptions,
  });

  if (!suggestion) return null;

  return (
    <Wrapper>
      <StyledTypography>
        <span>{search}</span>
        {suggestion.rest}
      </StyledTypography>
      <Icon
        data={keyboard_tab}
        color={colors.text.static_icons__tertiary.rgba}
        size={16}
        data-testid="autocomplete-tab-icon"
      />
    </Wrapper>
  );
}
