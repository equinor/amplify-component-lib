import { IconData } from '@equinor/eds-icons';

export interface SideBarMenuItem {
  icon: IconData;
  name: string;
  link: string;
  onClick?: () => void;
  replace?: boolean;
}
