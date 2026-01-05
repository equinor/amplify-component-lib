import { BannerProps } from './Banner';
import { colors, shape, spacings } from 'src/atoms/style';

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

const SPACINGS: Record<
  NonNullable<BannerProps['spacing']>,
  {
    padding: string;
    gap: string;
  }
> = {
  comfortable: {
    padding: spacings.medium_small,
    gap: spacings.medium,
  },
  compact: {
    padding: `${spacings.x_small} ${spacings.small}`,
    gap: spacings.medium_small,
  },
} as const;

interface ContainerProps {
  $variant: BannerProps['variant'];
  $spacing: NonNullable<BannerProps['spacing']>;
}

export const Container = styled.div<ContainerProps>`
  height: fit-content;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  background: ${({ $variant }) => VARIANT_COLORS[$variant].background};
  gap: ${({ $spacing }) => SPACINGS[$spacing].gap};
  padding: ${({ $spacing }) => SPACINGS[$spacing].padding};
  border-radius: ${shape.corners.borderRadius};

  > svg {
    fill: ${({ $variant }) => VARIANT_COLORS[$variant].fill};
  }
  > p {
    white-space: pre-wrap;
  }
`;
