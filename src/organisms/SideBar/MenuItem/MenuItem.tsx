import { FC } from 'react';

import { BasicMenuItem } from './BasicMenuItem';
import { CollapsableMenuItem } from './CollapsableMenuItem';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';

export type MenuItemProps = {
  currentUrl?: string;
  disabled?: boolean;
} & SideBarMenuItem;

export const MenuItem: FC<MenuItemProps> = (props) => {
  if ('items' in props) {
    return <CollapsableMenuItem {...props} />;
  }
  return <BasicMenuItem {...props} />;
};
