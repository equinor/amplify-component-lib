import { IconData } from '@equinor/eds-icons';
import React from 'react';
export interface SingleFilterMenuProps {
    onChange: (selectedId: string | undefined | null) => void;
    customIcon?: IconData;
    menuTitle: string;
    data: Array<string>;
    showChip?: boolean;
    chipColor?: string;
}
declare const SingleFilterMenu: React.ForwardRefExoticComponent<SingleFilterMenuProps & React.RefAttributes<HTMLUListElement>>;
export default SingleFilterMenu;
