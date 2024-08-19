import { Snackbar } from '@equinor/eds-core-react';

import { ShowSnackbar } from './SnackbarProvider';
import { colors } from 'src/atoms/style/colors';
import { spacings } from 'src/atoms/style/spacings';

import styled, { css } from 'styled-components';

const VARIANT_COLORS: Record<
  ShowSnackbar['variant'],
  {
    outline: string;
    text: string;
    icon: string;
  }
> = {
  info: {
    outline: colors.text.static_icons__default.rgba,
    text: colors.text.static_icons__primary_white.rgba,
    icon: colors.text.static_icons__primary_white.rgba,
  },
  warning: {
    outline: colors.interactive.warning__highlight.rgba,
    text: colors.ui.background__warning.rgba,
    icon: colors.interactive.warning__resting.rgba,
  },
  error: {
    outline: colors.interactive.danger__highlight.rgba,
    text: colors.ui.background__danger.rgba,
    icon: colors.interactive.danger__resting.rgba,
  },
} as const;

interface StyledSnackbarProps {
  $variant: ShowSnackbar['variant'] | undefined;
}

export const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  gap: ${spacings.small};
  max-width: 512px;
  min-width: calc(300px - ${spacings.medium} * 2);
  background: ${colors.text.static_icons__default.rgba};
  padding: ${spacings.small} ${spacings.small} ${spacings.small}
    ${spacings.medium};
  min-height: unset;
  &:has(div > button) {
    grid-template-columns: auto 1fr auto auto;
  }
  > div > button:hover,
  > button:hover {
    color: ${colors.text.static_icons__default.rgba};
    background: ${colors.ui.background__light.rgba};
    svg {
      fill: ${colors.text.static_icons__default.rgba};
    }
  }
  > button {
    height: 36px;
    width: 36px;
  }
  ${({ $variant }) => {
    if (!$variant) return '';

    const { outline, text, icon } = VARIANT_COLORS[$variant];
    return css`
      outline: 1px solid ${outline};

      p,
      button {
        color: ${text};
      }
      svg {
        fill: ${text};
      }
      > svg:first-child {
        fill: ${icon};
      }
    `;
  }}
`;
