import {
  arrow_down,
  arrow_up,
  error_outlined,
  IconData,
  warning_outlined,
} from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';
import { TableHeaderProps } from 'src/molecules/TableHeader/TableHeader';

export function getLeadingIcon(
  props: Pick<TableHeaderProps, 'variant' | 'leadingIcon'>
): IconData | undefined {
  if (props.leadingIcon) return props.leadingIcon;

  switch (props.variant) {
    case 'warning':
      return warning_outlined;
    case 'error':
      return error_outlined;
  }
}

export function getLeadingIconColor(
  props: Pick<TableHeaderProps, 'variant' | 'onClick'>
): string {
  switch (props.variant) {
    case 'warning':
      return colors.interactive.warning__text.rgba;
    case 'error':
      return colors.interactive.danger__text.rgba;
  }

  if (props.onClick) {
    return colors.interactive.primary__resting.rgba;
  }

  return colors.text.static_icons__tertiary.rgba;
}

export function getActionIconColor(
  props: Pick<TableHeaderProps, 'variant'>
): string {
  switch (props.variant) {
    case 'warning':
      return colors.interactive.warning__text.rgba;
    case 'error':
      return colors.interactive.danger__text.rgba;
  }

  return colors.interactive.primary__resting.rgba;
}

export function getSortingIcon(
  isSorting: NonNullable<NonNullable<TableHeaderProps['sorting']>['isSorting']>
): IconData {
  switch (isSorting) {
    case 'asc':
      return arrow_up;
    case 'desc':
      return arrow_down;
  }
}

export function getTextColor(
  props: Pick<TableHeaderProps, 'variant' | 'onClick'>
): string {
  if (props.onClick) {
    switch (props.variant) {
      case 'warning':
        return colors.interactive.warning__text.rgba;
      case 'error':
        return colors.interactive.danger__text.rgba;
      default:
        return colors.interactive.primary__resting.rgba;
    }
  }

  return colors.text.static_icons__default.rgba;
}

export function getHoverColor(
  props: Pick<TableHeaderProps, 'variant'>
): string {
  switch (props.variant) {
    case 'warning':
      return colors.interactive.warning__highlight.rgba;
    case 'error':
      return colors.interactive.danger__highlight.rgba;
    default:
      return colors.interactive.primary__hover_alt.rgba;
  }
}

export function getButtonHoverColor(
  props: Pick<TableHeaderProps, 'variant'>
): string {
  switch (props.variant) {
    case 'warning':
      return colors.interactive.warning__text.rgba;
    case 'error':
      return colors.interactive.danger__text.rgba;
    default:
      return colors.interactive.primary__hover.rgba;
  }
}
