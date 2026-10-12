import { HTMLAttributes } from 'react';

import { IconData } from '@equinor/eds-icons';
import { LinkProps } from '@tanstack/react-router';

interface SideBarMenuItemBase extends LinkProps {
  icon: IconData;
  name: string;
  featureUuid?: string;
}

export type BasicSideBarMenuItem = {
  onClick?: () => void;
} & SideBarMenuItemBase;

export type SideBarSubMenuItem = Omit<SideBarMenuItemBase, 'icon'> & {
  disabled?: boolean;
};

export interface SideBarMenuItemWithItems extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'children'
> {
  icon: IconData;
  name: string;
  featureUuid?: string;
  items: SideBarSubMenuItem[];
  /** Show a search field that filters submenu items by name. */
  isSearchable?: boolean;
}

export type SideBarMenuItem = SideBarMenuItemWithItems | BasicSideBarMenuItem;
