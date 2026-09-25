import { BannerProps } from './Banner';
import { BANNER_BUTTON_VARIABLES, BANNER_COLORS } from './Banner.tokens';
import { shape, spacings } from 'src/atoms/style';
import { IconButton } from 'src/molecules/Button/IconButton/IconButton';

import styled from 'styled-components';

const SPACINGS: Record<
  NonNullable<BannerProps['spacing']>,
  {
    padding: string;
    gap: string;
  }
> = {
  comfortable: {
    padding: spacings.medium_small,
    gap: spacings.medium_small,
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
  ${({ $variant }) => BANNER_BUTTON_VARIABLES[$variant]}

  height: fit-content;
  min-height: ${({ $spacing }) =>
    $spacing === 'comfortable'
      ? `calc(${shape.button.minHeight} + 2 * ${spacings.medium_small})`
      : 'auto'};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: ${({ $variant }) => BANNER_COLORS[$variant].background};
  gap: ${({ $spacing }) => SPACINGS[$spacing].gap};
  padding: ${({ $spacing }) => SPACINGS[$spacing].padding};
  border-radius: ${shape.corners.borderRadius};
`;

export const Message = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: ${({ $spacing }) => SPACINGS[$spacing].gap};
  flex: 1 1 12rem;
  min-width: 0;
  > svg {
    fill: ${({ $variant }) => BANNER_COLORS[$variant].text};
  }
`;

export const Content = styled.div`
  min-width: 0;
  overflow-wrap: anywhere;
  > p {
    white-space: pre-wrap;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacings.x_small};
  max-width: 100%;
  margin-left: auto;

  &:empty {
    display: none;
  }
`;

export const DismissButton = styled(IconButton)`
  &::before {
    inset: -1px;
  }
`;
