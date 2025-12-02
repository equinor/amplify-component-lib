import { HTMLAttributes } from 'react';

import { IconData } from '@equinor/eds-icons';

interface SideBarMenuItemBase {
  icon: IconData;
  name: string;
  link: string;
  featureUuid?: string;
  /**
   * `true` if the menu item should be matched exactly against the current URL.
   * When `false`, the menu item is considered active if the current URL includes the menu item's link.
   * The comparison always ignores URL parameters.
   */
  exact?: boolean;
}

export type BasicSideBarMenuItem = {
  onClick?: () => void;
  replace?: boolean;
} & SideBarMenuItemBase &
  Omit<HTMLAttributes<HTMLAnchorElement>, 'children' | 'href' | 'onClick'>;

export interface SideBarMenuItemWithItems
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconData;
  name: string;
  featureUuid?: string;
  items: (Omit<SideBarMenuItemBase, 'icon'> & { disabled?: boolean })[];
}

export type SideBarMenuItem = SideBarMenuItemWithItems | BasicSideBarMenuItem;
