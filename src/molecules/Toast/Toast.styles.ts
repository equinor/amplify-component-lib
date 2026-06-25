import { Typography } from '@equinor/eds-core-react';

import { shape, spacings } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import { IconButton } from 'src/molecules/Button/IconButton/IconButton';
import type { ToastProps } from 'src/molecules/Toast/Toast';
import { TOAST_COLORS } from 'src/molecules/Toast/Toast.utils';

import styled, { keyframes } from 'styled-components';

interface VariantProps {
  $variant?: ToastProps['variant'];
}

interface HeaderProps {
  $hasIcon: boolean;
}

const getVariantColors = (variant?: ToastProps['variant']) =>
  TOAST_COLORS[variant ?? 'neutral'];

export const Header = styled.header<HeaderProps>`
  display: grid;
  grid-template-columns: ${({ $hasIcon }) =>
    $hasIcon ? 'auto minmax(0, 1fr) auto' : 'minmax(0, 1fr) auto'};
  grid-template-areas: ${({ $hasIcon }) =>
    $hasIcon ? "'icon title close'" : "'title close'"};
  align-items: start;
  gap: ${spacings.small};
`;

export const HeaderIcon = styled.span<VariantProps>`
  grid-area: icon;
  display: inline-flex;
  align-items: center;

  > svg {
    color: ${({ $variant }) => getVariantColors($variant).actionText};
  }
`;

export const Title = styled(Typography)`
  grid-area: title;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ActionButton = styled(Button)<VariantProps>`
  align-self: flex-start;
  width: fit-content;
  margin-left: ${spacings.small};
  color: ${({ $variant }) => getVariantColors($variant).actionText};
  border-color: ${({ $variant }) => getVariantColors($variant).actionText};
  &:hover {
    background: ${({ $variant }) =>
      getVariantColors($variant).actionBackgroundHover};
    color: ${({ $variant }) => getVariantColors($variant).actionTextHover};
    border-color: ${({ $variant }) =>
      getVariantColors($variant).actionTextHover};
  }
`;

export const CloseButton = styled(IconButton)<VariantProps>`
  position: absolute;
  top: ${spacings.x_small};
  right: ${spacings.x_small};
  grid-area: close;
  color: ${({ $variant }) => getVariantColors($variant).actionText};
  &:hover {
    color: ${({ $variant }) => getVariantColors($variant).actionTextHover};
    &:before {
      background: ${({ $variant }) =>
        getVariantColors($variant).actionBackgroundHover};
      border-color: ${({ $variant }) =>
        getVariantColors($variant).actionBackgroundHover};
    }
  }
`;

export const Description = styled(Typography)`
  margin: 0 ${spacings.small};
  margin-right: ${spacings.medium};
`;

interface ContainerProps {
  $variant: ToastProps['variant'];
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.medium_small} ${spacings.x_small} ${spacings.medium_small}
    ${spacings.medium_small};
  overflow: hidden;
  min-width: 300px;
  max-width: 420px;
  background: ${({ $variant }) => getVariantColors($variant).background};
`;
const durationAnimation = keyframes`
 from {
   width: 100%
 }
  to {
    width: 0
  }
`;

interface DurationBarProps {
  $duration: number;
  $variant?: ToastProps['variant'];
}

export const DurationBar = styled.span<DurationBarProps>`
  background: white;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  &:after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background: ${({ $variant }) =>
      TOAST_COLORS[$variant ?? 'neutral'].background};
    opacity: 0.5;
    z-index: 0;
  }
  &:before {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background: ${({ $variant }) =>
      TOAST_COLORS[$variant ?? 'neutral'].duration};
    z-index: 1;
    animation: ${durationAnimation} ${({ $duration }) => $duration}s linear;
    animation-fill-mode: forwards;
  }
`;
