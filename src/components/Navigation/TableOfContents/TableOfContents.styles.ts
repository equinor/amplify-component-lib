import { tokens } from '@equinor/eds-tokens';

import { HEIGHT } from 'src/components/Navigation/TableOfContents/TableOfContents.constants';
import { TableOfContentsVariants } from 'src/components/Navigation/TableOfContents/TableOfContents.types';
import { spacings } from 'src/style';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

const { colors, shape } = tokens;

interface ButtonProps {
  $active: boolean;
  $variant: TableOfContentsVariants;
}

export const Button = styled.button<ButtonProps>`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${spacings.small};
  color: ${colors.text.static_icons__default.rgba};
  cursor: pointer;
  padding: 0 ${spacings.medium};
  height: ${({ $variant }) => HEIGHT[$variant]};
  transition: background 200ms;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
  > span {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: left;
    font-family: 'Equinor', sans-serif;
    font-weight: 700;
    font-size: 14px;
  }
  ${({ $variant, $active }) => {
    switch ($variant) {
      case 'buttons':
        return css`
          border-radius: ${shape.corners.borderRadius};
          background: ${$active
            ? colors.interactive.primary__hover_alt.rgba
            : 'none'};
        `;
      case 'border':
        return css`
          > span {
            font-weight: ${$active ? 700 : 500};
            &:after {
              height: 0;
              display: block;
              content: attr(title);
              font-weight: 700;
              font-size: 14px;
              overflow: hidden;
              visibility: hidden;
            }
          }
        `;
    }
  }}
  ${({ $active }) =>
    !$active &&
    css`
      &:disabled {
        color: ${colors.interactive.disabled__text.rgba};
        cursor: not-allowed;
      }
    `}
`;

interface CountDotProps {
  $disabledText?: boolean;
}

export const CountDot = styled.div<CountDotProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    font-weight: 500;
    font-size: 12px;
    color: ${({ $disabledText }) =>
      $disabledText
        ? colors.interactive.disabled__text.rgba
        : colors.text.static_icons__tertiary.rgba};
    padding: 0 ${spacings.x_small};
    line-height: normal;
  }
  background: ${colors.ui.background__medium.rgba};
  width: fit-content;
  min-width: 16px;
  height: 16px;
  border-radius: ${shape.rounded.borderRadius};
`;

interface BorderItemsContainerProps {
  $activeIndex: number;
  $index: number;
}

export const BorderItemsContainer = styled.div<BorderItemsContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  &:after {
    position: absolute;
    left: 0;
    top: ${({ $activeIndex, $index }) => `${($activeIndex - $index) * 100}%`};
    content: '';
    width: 2px;
    height: 100%;
    background: ${colors.interactive.primary__resting.rgba};
    z-index: 100;
  }
`;

interface ContainerProps {
  $variant: TableOfContentsVariants;
}

export const Container = styled(motion.div)<ContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  ${({ $variant }) => css`
    min-height: ${HEIGHT[$variant]};
    ${$variant === 'buttons' && `gap: ${spacings.x_small};`}
  `}
`;

interface ChildContainerProps {
  $variant: TableOfContentsVariants;
  $shouldShowChildren: boolean;
}

export const ChildContainer = styled(motion.div)<ChildContainerProps>`
  display: flex;
  flex-direction: column;
  ${({ $shouldShowChildren }) =>
    !$shouldShowChildren
      ? css`
          visibility: hidden;
          height: 0 !important;
        `
      : null}
  > div > button {
    ${({ $variant }) => {
      switch ($variant) {
        case 'buttons':
          return css`
            margin-left: ${spacings.medium};
          `;
        case 'border':
          return css`
            padding-left: ${spacings.x_large};
          `;
      }
    }}
  }

  ${({ $variant }) => $variant === 'buttons' && `gap:${spacings.x_small};`}
`;
