import { tokens } from '@equinor/eds-tokens';

import { SidebarTheme } from './SideBar.types';

const { colors } = tokens;

export function hoverColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.interactive.primary__selected_hover.hex;
    case SidebarTheme.dark:
      return '#324D62'; // EDS dark mode interactive table cell fill hover
  }
}

export function activeColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.interactive.primary__selected_highlight.hex;
    case SidebarTheme.dark:
      return '#1E3C52'; // EDS dark mode interactive table cell fill hover
  }
}

export function textColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.text.static_icons__default.hex;
    case SidebarTheme.dark:
      return colors.text.static_icons__primary_white.hex;
  }
}

export function borderBottomColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.ui.background__medium.hex;
    case SidebarTheme.dark:
      return 'rgb(57,73,84)';
  }
}
