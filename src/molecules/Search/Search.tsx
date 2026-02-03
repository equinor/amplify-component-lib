import { forwardRef } from 'react';

import {
  Search as Base,
  SearchProps as BaseProps,
} from '@equinor/eds-core-react';

import { animation } from 'src/atoms/style/animation';
import { colors } from 'src/atoms/style/colors';

import styled, { css } from 'styled-components';

interface StyledBaseProps {
  $lightBackground: boolean;
}

const StyledBase = styled(Base)<StyledBaseProps>`
  input {
    color: ${colors.text.static_icons__default.rgba};
    transition:
      background ${animation.transitionMS},
      box-shadow ${animation.transitionMS};
    &:hover:not(:disabled) {
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

  ${({ $lightBackground }) => {
    if (!$lightBackground) return '';

    return css`
      > div:first-child {
        background: ${colors.ui.background__default.rgba};
      }
    `;
  }}
`;

interface SearchProps extends BaseProps {
  lightBackground?: boolean;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ lightBackground = false, ...rest }, ref) => (
    <StyledBase
      {...rest}
      ref={ref}
      autoComplete="off"
      $lightBackground={lightBackground}
    />
  )
);

Search.displayName = 'Search';
