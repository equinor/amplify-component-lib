import { forwardRef } from 'react';

import { Search as Base, SearchProps } from '@equinor/eds-core-react';

import { animation } from 'src/atoms/style/animation';
import { colors } from 'src/atoms/style/colors';

import styled from 'styled-components';

const StyledBase = styled(Base)`
  input {
    color: ${colors.text.static_icons__default.rgba};
    transition:
      background ${animation.transitionMS},
      box-shadow ${animation.transitionMS};
    &:hover {
      background: ${colors.ui.background__light_medium.rgba};
      box-shadow: inset 0 -2px 0 0 ${colors.text.static_icons__tertiary.rgba};
    }
  }

  div:focus-within {
    outline: none !important;

    input {
      box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
    }
  }
`;

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (props, ref) => <StyledBase {...props} ref={ref} autoComplete="off" />
);

Search.displayName = 'HeaderDrawer';
