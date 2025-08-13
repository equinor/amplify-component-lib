import { FC } from 'react';

import { BasicMenuItem } from './BasicMenuItem';
import { CollapsableMenuItem } from './CollapsableMenuItem';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';

export type MenuItemProps = {
  /**
   * @deprecated - currentUrl is not needed anymore, useLocation from react router is used internally
   */
  currentUrl?: string;
  disabled?: boolean;
} & SideBarMenuItem;

export const MenuItem: FC<MenuItemProps> = (props) => {
  if ('items' in props) {
    return <CollapsableMenuItem {...props} />;
  }
  return <BasicMenuItem {...props} />;
};