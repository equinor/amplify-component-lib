import {
  MenuItem,
  MenuItemType as ItemType,
} from 'src/organisms/SideBar/MenuItem';
import { SideBar as BaseSideBar } from 'src/organisms/SideBar/SideBar';

type SidebarType = typeof BaseSideBar & {
  Item: typeof MenuItem;
};

export const SideBar = BaseSideBar as SidebarType;
SideBar.Item = MenuItem;
SideBar.Item.displayName = 'SideBar.Item';

export type { ItemType, SidebarType };
