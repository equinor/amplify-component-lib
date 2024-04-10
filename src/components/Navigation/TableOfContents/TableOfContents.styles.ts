import { tokens } from '@equinor/eds-tokens';

import { TableOfContentsVariants } from 'src/components/Navigation/TableOfContents/TableOfContents.types';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors, shape } = tokens;

interface ButtonProps {
  $active: boolean;
  $variant: TableOfContentsVariants;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacings.xx_small};
  color: ${colors.text.static_icons__default.rgba};
  border: none;
  padding: ${spacings.medium_small} ${spacings.medium};
  text-align: left;
  cursor: pointer;
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
  transition: background 200ms;
  ${({ $variant, $active }) => {
    switch ($variant) {
      case 'buttons':
        return `
          border-radius: ${shape.corners.borderRadius};
          background: ${$active ? colors.interactive.primary__hover_alt.rgba : 'none'};
          &:hover {
            background: ${colors.interactive.primary__hover_alt.rgba};
          }
        `;
      case 'border':
        return `
          height: 48px;
          font-weight: ${$active ? 700 : 500};
          &:hover {
            background: ${colors.interactive.primary__hover_alt.rgba};
          }
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
    transition: top 400ms;
    position: absolute;
    left: -2px;
    top: ${({ $activeIndex, $index }) => `${($activeIndex - $index) * 100}%`};
    content: '';
    width: 2px;
    height: 100%;
    background: ${colors.interactive.primary__resting.rgba};
  }
`;

interface ContainerProps {
  $layer: number;
  $variant: TableOfContentsVariants;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacings.x_small};
  > button:not(:first-child) {
    ${({ $variant }) => {
      switch ($variant) {
        case 'buttons':
          return `margin-left: ${spacings.medium};`;
        case 'border':
          return `padding-left: ${spacings.x_large};`;
      }
    }}
  }
  ${({ $variant, $layer }) => {
    switch ($variant) {
      case 'buttons':
        return `margin-left: calc(${$layer} * ${spacings.medium});`;
      case 'border':
        return `padding-left: calc(${$layer} * ${spacings.medium});`;
    }
  }}
`;
