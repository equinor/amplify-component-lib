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
  display: block;
  color: ${colors.text.static_icons__default.rgba};
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
  transition: background 200ms;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
  ${({ $variant, $active }) => {
    switch ($variant) {
      case 'buttons':
        return `
          padding: ${spacings.medium_small} ${spacings.medium};
          border-radius: ${shape.corners.borderRadius};
          background: ${$active ? colors.interactive.primary__hover_alt.rgba : 'none'};
        `;
      case 'border':
        return `
          width: 100%;
          padding: ${spacings.medium_small} ${spacings.medium};
          font-weight: ${$active ? 700 : 500};
          // Font height of the equinor for is wonky, this makes it look more vertically aligned
          line-height: 10px;
          &:after {
            height: 0;
            display: block; 
            content: attr(title);
            font-weight: 700;
            color: transparent;
            overflow: hidden;
            visibility: hidden;
          }
        `;
    }
  }}
  ${({ $active }) =>
    !$active &&
    `
    &:disabled {
      color: ${colors.interactive.disabled__text.rgba};
      cursor: not-allowed;
    }
  `}
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
}

export const ChildContainer = styled(motion.div)<ChildContainerProps>`
  display: flex;
  flex-direction: column;
  ${({ $variant }) => $variant === 'buttons' && `gap:${spacings.x_small};`}

  > button {
    ${({ $variant }) => {
      switch ($variant) {
        case 'buttons':
          return `margin-left: ${spacings.medium};`;
        case 'border':
          return `padding-left: ${spacings.x_large};`;
      }
    }}
  }
`;
