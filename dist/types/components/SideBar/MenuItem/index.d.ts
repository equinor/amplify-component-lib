import React from 'react';
import { IconData } from '@equinor/eds-icons';
export declare type MenuItemType = {
    icon?: IconData;
    name: string;
    link?: string;
    onClick?: () => void;
};
export declare type MenuItemProps = {
    currentUrl?: string;
} & MenuItemType & React.HTMLAttributes<HTMLAnchorElement>;
declare const MenuItem: React.ForwardRefExoticComponent<{
    currentUrl?: string | undefined;
} & MenuItemType & React.HTMLAttributes<HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement>>;
export default MenuItem;
