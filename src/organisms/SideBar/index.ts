import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { MenuItem } from 'src/organisms/SideBar/MenuItem/MenuItem';
import { SideBar as BaseSideBar } from 'src/organisms/SideBar/SideBar';

type SidebarType = typeof BaseSideBar & {
  Item: typeof MenuItem;
};

/**
 * @deprecated Unnecessary rename of SideBarMenuItem, use SideBarMenuItem instead
 */
type ItemType = SideBarMenuItem;

export const SideBar = BaseSideBar as SidebarType;
SideBar.Item = MenuItem;

export type { ItemType };

export type { SidebarType };
