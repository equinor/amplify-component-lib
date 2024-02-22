import { FC } from 'react';

import { Search as Base, SearchProps } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

const StyledBase = styled(Base)`
  input {
    color: ${colors.text.static_icons__default.rgba};
  }

  div:focus-within {
    outline: none !important;

    input {
      box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
    }
  }
`;

export const Search: FC<SearchProps> = (props) => (
  <StyledBase {...props} autoComplete="off" />
);
