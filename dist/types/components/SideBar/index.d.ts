import { SideBar as BaseSideBar } from './SideBar';
import MenuItem, { MenuItemType as ItemType } from './MenuItem';
declare type SidebarType = typeof BaseSideBar & {
    Item: typeof MenuItem;
};
declare const SideBar: SidebarType;
export default SideBar;
export type { SidebarType, ItemType };
