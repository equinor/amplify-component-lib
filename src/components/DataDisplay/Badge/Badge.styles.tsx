import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';
import { Variants } from 'src/components/DataDisplay/Badge/Badge';

import styled from 'styled-components';

const { colors, shape } = tokens;

interface CountDotProps {
  $variant: Variants;
}

const pickColorSchemeBy = (variant: Variants) => {
  const colorSchemes = {
    light: {
      background: 'rgba(235, 235, 235, 1)',
      color: colors.text.static_icons__tertiary.rgba,
    },
    danger: {
      background: colors.interactive.danger__resting.rgba,
      color: colors.text.static_icons__primary_white.rgba,
    },
    empty: {
      background: colors.interactive.disabled__fill.rgba,
      color: colors.interactive.disabled__text.rgba,
    },
    default: {
      background: colors.text.static_icons__tertiary.rgba,
      color: colors.text.static_icons__primary_white.rgba,
    },
  };

  return colorSchemes[variant];
};

export const Container = styled.div<CountDotProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    font-weight: 500;
    font-size: 12px;
    color: ${({ $variant }) => pickColorSchemeBy($variant).color};
    padding: 0 ${spacings.x_small};
    line-height: normal;
  }
  background: ${({ $variant }) => pickColorSchemeBy($variant).background};
  min-width: 16px;
  width: fit-content;
  height: 16px;
  border-radius: ${shape.rounded.borderRadius};
`;
