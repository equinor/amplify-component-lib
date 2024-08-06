import { BannerProps } from './Banner';
import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const VARIANT_COLORS: Record<
  BannerProps['variant'],
  {
    background: string;
    fill: string;
  }
> = {
  info: {
    background: colors.interactive.secondary__highlight.rgba,
    fill: colors.interactive.secondary__resting.rgba,
  },
  warning: {
    background: colors.interactive.warning__highlight.rgba,
    fill: colors.interactive.warning__resting.rgba,
  },
  danger: {
    background: colors.interactive.danger__highlight.rgba,
    fill: colors.interactive.danger__text.rgba,
  },
} as const;

interface ContainerProps {
  $variant: BannerProps['variant'];
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  background: ${({ $variant }) => VARIANT_COLORS[$variant].background};
  gap: ${spacings.medium};
  padding: ${spacings.medium_small};

  > svg {
    fill: ${({ $variant }) => VARIANT_COLORS[$variant].fill};
  }
  > p {
    white-space: pre-wrap;
  }
`;
