import { HTMLAttributes } from 'react';

import { IconData } from '@equinor/eds-icons';

interface SideBarMenuItemBase {
  icon: IconData;
  name: string;
  link: string;
  featureUuid?: string;
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
  items: Omit<SideBarMenuItemBase, 'icon'>[];
}

export type SideBarMenuItem = SideBarMenuItemWithItems | BasicSideBarMenuItem;
