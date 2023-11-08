import { tokens } from '@equinor/eds-tokens';

import { SidebarTheme } from './SideBar.types';

const { colors } = tokens;

export function backgroundColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.ui.background__default.hex;
    case SidebarTheme.dark:
      return '#132634'; // EDS Dark theme ui background default
  }
}

export function borderColor(theme: SidebarTheme) {
  switch (theme) {
    case SidebarTheme.light:
      return colors.ui.background__medium.hex;
    case SidebarTheme.dark:
      return 'transparent';
  }
}
