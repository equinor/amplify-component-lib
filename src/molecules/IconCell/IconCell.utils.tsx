import { ReactNode } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { ButtonProps } from './IconCell.styles';
import {
  IconCellColor,
  IconCellColorObject,
  IconCellColors,
  IconCellState,
  IconCellStates,
  IconCellVariants,
} from './IconCell.types';
import { colors, Theme } from 'src/atoms';

export const renderContent = (content: IconData | ReactNode, color: string) => {
  if (content && typeof content === 'object' && 'prefix' in content) {
    return <Icon data={content} color={color} />;
  } else {
    return content;
  }
};

export const getIconCellColor = (
  color: IconCellColor,
  theme: Theme
): IconCellColorObject => {
  switch (color) {
    case IconCellColors.GREEN:
    case IconCellColors.SUCCESS:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.interactive.success__highlight.rgba,
            iconColor: colors.dataviz.darkgreen.default,
          }
        : {
            backgroundColor: colors.dataviz.darkgreen.default,
            iconColor: colors.dataviz.lightgreen.lighter,
          };
    case IconCellColors.RED:
    case IconCellColors.ERROR:
    case IconCellColors.DANGER:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.interactive.danger__highlight.rgba,
            iconColor: colors.interactive.danger__text.rgba,
          }
        : {
            backgroundColor: colors.ui.background__danger.rgba,
            iconColor: colors.text.static_icons__default.rgba,
          };
    case IconCellColors.ORANGE:
    case IconCellColors.WARNING:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.interactive.warning__highlight.rgba,
            iconColor: colors.dataviz.darkyellow.darker,
          }
        : {
            backgroundColor: colors.ui.background__warning.rgba,
            iconColor: colors.text.static_icons__default.rgba,
          };
    case IconCellColors.BLUE:
    case IconCellColors.INFO:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.dataviz.lightblue.lighter,
            iconColor: colors.dataviz.primary.darker,
          }
        : {
            backgroundColor: colors.dataviz.darkblue.default,
            iconColor: colors.dataviz.lightblue.lighter,
          };
    case IconCellColors.LIGHTGREY:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.ui.background__light.rgba,
            iconColor: colors.dataviz.lightgray.darker,
          }
        : {
            backgroundColor: colors.ui.background__heavy.rgba,
            iconColor: colors.text.static_icons__secondary.rgba,
          };
    case IconCellColors.PINK:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.dataviz.darkpink.lighter,
            iconColor: colors.dataviz.darkpink.darker,
          }
        : {
            backgroundColor: colors.dataviz.darkpink.darker,
            iconColor: colors.dataviz.darkpink.lighter,
          };
    case IconCellColors.YELLOW:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.dataviz.lightyellow.lighter,
            iconColor: colors.dataviz.darkyellow.darker,
          }
        : {
            backgroundColor: colors.dataviz.darkyellow.darker,
            iconColor: colors.dataviz.lightyellow.lighter,
          };
    case IconCellColors.PURPLE:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.dataviz.lightpurple.lighter,
            iconColor: colors.dataviz.darkpurple.darker,
          }
        : {
            backgroundColor: colors.dataviz.darkpurple.darker,
            iconColor: colors.dataviz.lightpurple.lighter,
          };
    case IconCellColors.GREY:
    default:
      return theme === Theme.LIGHT
        ? {
            backgroundColor: colors.ui.background__medium.rgba,
            iconColor: colors.text.static_icons__default.rgba,
          }
        : {
            backgroundColor: colors.ui.background__light.rgba,
            iconColor: colors.text.static_icons__default.rgba,
          };
  }
};

// Helper to get a color by state with fallback
export const stateBorderColors: { [key in IconCellState]?: string } = {
  [IconCellStates.DANGER]: colors.interactive.danger__resting.rgba,
  [IconCellStates.WARNING]: colors.interactive.warning__resting.rgba,
};

export const stateBGColor: { [key in IconCellState]?: string } = {
  [IconCellStates.DANGER]: colors.ui.background__danger.rgba,
  [IconCellStates.WARNING]: colors.ui.background__warning.rgba,
};

const getStateColor = (fallback: string, $state?: IconCellState) => {
  const color = $state ? stateBorderColors[$state] : undefined;
  return color ?? fallback;
};

export const getBorderBottom = ({
  $noBottomBorder,
  $state,
  $backgroundColor,
}: ButtonProps) => {
  const color = $noBottomBorder
    ? $backgroundColor
    : getStateColor(colors.ui.background__medium.rgba, $state);
  return `1px solid ${color}`;
};

export const getSelectedBorder = ($state?: IconCellState) =>
  getStateColor(colors.text.static_icons__default.rgba, $state);

export const getBackground = ({
  $variant,
  $state,
  $backgroundColor = colors.ui.background__default.rgba,
}: ButtonProps) => {
  if ($variant === IconCellVariants.SCRIBBLED_OUT) {
    return `repeating-linear-gradient(
      20deg,
      ${colors.ui.background__light_medium.rgba} 0px,
      ${colors.ui.background__default.rgba} 1px,
      ${colors.ui.background__default.rgba} 10px,
      ${colors.ui.background__light_medium.rgba} 11px,
      ${colors.ui.background__light_medium.rgba} 12px
    )`;
  }
  if ($variant !== IconCellVariants.COLOURED) return 'transparent';
  if ($state === IconCellStates.DANGER)
    return stateBGColor[IconCellStates.DANGER];
  if ($state === IconCellStates.WARNING)
    return stateBGColor[IconCellStates.WARNING];
  return $backgroundColor;
};
