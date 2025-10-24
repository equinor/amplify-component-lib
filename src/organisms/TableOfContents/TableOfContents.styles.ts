import { Link as TanstackLink } from '@tanstack/react-router';

import { animation, colors, spacings } from 'src/atoms/style';
import { VERTICAL_ITEM_HEIGHT } from 'src/organisms/TableOfContents/TableOfContents.constants';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

interface ButtonProps {
  $active: boolean;
}

export const Button = styled.button<ButtonProps>`
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
  ${({ $active }) => {
    if ($active) return '';
    return css`
      &:focus:not(:hover) {
        outline: 2px dashed ${colors.interactive.focus.rgba};
        outline-offset: -4px;
      }
    `;
  }}
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${spacings.small};
  color: ${colors.text.static_icons__default.rgba};
  cursor: pointer;
  padding: 0 ${spacings.medium};
  height: ${VERTICAL_ITEM_HEIGHT};
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
  ${({ $active }) => {
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

export const Link = styled(TanstackLink)<LinkProps>`
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
  height: ${VERTICAL_ITEM_HEIGHT};
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
  ${({ $active }) => {
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
  }}
`;

interface BorderItemsHorizontalContainerProps {
  $activeIndex: number;
  $index: number;
}

export const BorderItemsHorizontalContainer = styled.div<BorderItemsHorizontalContainerProps>`
  display: flex;
  position: relative;
  &:after {
    position: absolute;
    left: 0;
    bottom: ${({ $activeIndex, $index }) =>
      `${($activeIndex - $index) * 100}%`};
    content: '';
    width: 100%;
    height: 2px;
    background: ${colors.interactive.primary__resting.rgba};
    z-index: 100;
  }
`;

interface BorderItemsContainerProps {
  $activeIndex: number;
  $index: number;
}

export const BorderItemsContainer = styled.div<BorderItemsContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  &:after {
    position: absolute;
    left: 0;
    top: ${({ $activeIndex, $index }) => `${($activeIndex - $index) * 100}%`};
    content: '';
    width: 2px;
    height: 100%;
    background: ${colors.interactive.primary__resting.rgba};
    z-index: 100;
    transition: top ${animation.transitionMS};
  }
`;

export const TableOfContentsItemContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: ${VERTICAL_ITEM_HEIGHT};
`;

export const TableOfContentsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: fit-content;
  overflow: hidden;
  &:after {
    position: absolute;
    left: 0;
    content: '';
    width: 2px;
    height: 100%;
    background: ${colors.ui.background__medium.rgba};
  }
`;

interface ChildContainerProps {
  $shouldShowChildren: boolean;
}

export const ChildContainer = styled(motion.div)<ChildContainerProps>`
  display: flex;
  flex-direction: column;
  > div > button,
  a {
    padding-left: ${spacings.x_large};
  }
  ${({ $shouldShowChildren }) =>
    !$shouldShowChildren
      ? css`
          visibility: hidden;
          height: 0 !important;
        `
      : ''}
`;
