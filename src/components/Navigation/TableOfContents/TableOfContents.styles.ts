import { Link as ReactLink } from 'react-router-dom';

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
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
  &:focus {
    outline: 2px dashed ${colors.interactive.focus.rgba};
    outline-offset: -4px;
  }
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

interface LinkProps extends ButtonProps {
  $disabled?: boolean;
}

export const Link = styled(ReactLink)<LinkProps>`
  text-decoration: none;
  &:focus,
  &:hover,
  &:active {
    text-decoration: none;
    color: ${colors.text.static_icons__default.rgba};
  }
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
  &:focus-visible {
    color: ${colors.text.static_icons__default.rgba};
    outline: 2px dashed ${colors.interactive.focus.rgba};
    outline-offset: -4px;
  }

  ${({ $disabled, $active }) =>
    $disabled &&
    !$active &&
    css`
      color: ${colors.interactive.disabled__text.rgba} !important;
      &:hover {
        cursor: not-allowed;
      }
    `};

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

interface TableOfContentsContainerProps {
  $variant: TableOfContentsVariants;
}

export const TableOfContentsItemContainer = styled(
  motion.div
)<TableOfContentsContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ $variant }) => css`
    min-height: ${HEIGHT[$variant]};
    ${$variant === 'buttons' && `gap: ${spacings.x_small};`}
  `}
`;

export const TableOfContentsContainer = styled(
  motion.div
)<TableOfContentsContainerProps>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  overflow: hidden;
  ${({ $variant }) => {
    switch ($variant) {
      case 'buttons':
        return `gap: ${spacings.small};`;
      case 'border':
        return css`
          &:after {
            position: absolute;
            left: 0;
            content: '';
            width: 2px;
            height: 100%;
            background: ${colors.ui.background__medium.rgba};
          }
        `;
    }
  }}
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
  > div > button, a {
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
