import { Typography } from '@equinor/eds-core-react';

import { colors, shape, spacings } from 'src/atoms/style';
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
    $hasIcon ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr)'};
  align-items: start;
  gap: ${spacings.small};
`;

export const HeaderIcon = styled.span<VariantProps>`
  display: inline-flex;
  align-items: center;

  > svg {
    color: ${({ $variant }) => getVariantColors($variant).controlForeground};
  }
`;

export const Title = styled(Typography)`
  padding-right: ${spacings.xx_large};
`;

export const ActionButton = styled(Button)<VariantProps>`
  align-self: flex-start;
  width: fit-content;
  margin-left: ${spacings.small};
  color: ${({ $variant }) => getVariantColors($variant).controlForeground};
  border-color: ${({ $variant }) =>
    getVariantColors($variant).controlForeground};
  &:hover {
    background: ${({ $variant }) =>
      getVariantColors($variant).controlHoverBackground};
    color: ${({ $variant }) =>
      getVariantColors($variant).controlForegroundHover};
    border-color: ${({ $variant }) =>
      getVariantColors($variant).controlForegroundHover};
  }
`;

export const CloseButton = styled(IconButton)<VariantProps>`
  position: absolute;
  top: ${spacings.x_small};
  right: ${spacings.x_small};
  color: ${({ $variant }) => getVariantColors($variant).controlForeground};
  &:hover {
    color: ${({ $variant }) =>
      getVariantColors($variant).controlForegroundHover};
    &::before {
      background: ${({ $variant }) =>
        getVariantColors($variant).controlHoverBackground};
      border-color: ${({ $variant }) =>
        getVariantColors($variant).controlHoverBackground};
    }
  }
`;

export const Description = styled(Typography)`
  margin: 0 ${spacings.medium} 0 ${spacings.small};
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
  background: ${({ $variant }) =>
    getVariantColors($variant).containerBackground};
`;

const durationAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
`;

interface DurationBarProps {
  $duration: number;
  $variant?: ToastProps['variant'];
}

export const DurationBar = styled.span<DurationBarProps>`
  background: ${colors.ui.background__default.rgba};
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  &::before {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background: ${({ $variant }) =>
      getVariantColors($variant).containerBackground};
    opacity: 0.5;
  }
  &::after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background: ${({ $variant }) => getVariantColors($variant).progressFill};
    animation: ${durationAnimation} ${({ $duration }) => $duration}s linear;
    animation-fill-mode: forwards;
  }
`;
