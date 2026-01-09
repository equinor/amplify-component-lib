import type { ChangeEvent, FC } from 'react';

import { useNavigate, useSearch } from '@tanstack/react-router';

import { colors } from 'src/atoms/style/colors';
import { Search as AmplifySearch } from 'src/molecules/Search/Search';

import { styled } from 'styled-components';

const StyledSearch = styled(AmplifySearch)`
  > div {
    background: ${colors.ui.background__default.rgba};
  }
`;

interface SearchProps {
  placeholder?: string;
}

export const Search: FC<SearchProps> = ({ placeholder }) => {
  const navigate = useNavigate();
  const { search } = useSearch({ strict: false });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      navigate({
        to: '.',
        search: { search: event.target.value },
        replace: true,
      });
    } else {
      navigate({ to: '.', search: undefined, replace: true });
    }
  };

  return (
    <StyledSearch
      value={search ?? ''}
      onChange={handleOnChange}
      placeholder={placeholder ?? 'Search for something...'}
    />
  );
};
