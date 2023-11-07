import { tokens } from '@equinor/eds-tokens';

import { SidebarTheme } from './SideBar.types';

const { colors } = tokens;

export function backgroundColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.interactive.primary__resting.hex;
    case SidebarTheme.dark:
      return '#97CACE'; // EDS dark mode interactive primary resting
  }
}

export function textColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.text.static_icons__primary_white.hex;
    case SidebarTheme.dark:
      return colors.text.static_icons__default.hex;
  }
}

export function hoverColor(theme: SidebarTheme, disabled: boolean) {
  if (disabled) {
    switch (theme) {
      case SidebarTheme.light:
        return colors.interactive.disabled__border.hex;
      case SidebarTheme.dark:
        return '#344450'; // EDS dark mode interactive disabled border
    }
  }

  switch (theme) {
    case SidebarTheme.light:
      return colors.interactive.primary__hover.hex;
    case SidebarTheme.dark:
      return '#ADE2E6'; // EDS dark mode interactive primary hover
  }
}
