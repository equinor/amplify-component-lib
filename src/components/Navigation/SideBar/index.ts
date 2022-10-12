import MenuItem, { MenuItemType as ItemType } from './MenuItem';
import { SideBar as BaseSideBar } from './SideBar';

type SidebarType = typeof BaseSideBar & {
  Item: typeof MenuItem;
};

const SideBar = BaseSideBar as SidebarType;
SideBar.Item = MenuItem;
SideBar.Item.displayName = 'SideBar.Item';

export default SideBar;
export type { ItemType, SidebarType };
