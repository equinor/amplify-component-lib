import { IconData } from '@equinor/eds-icons';
import React, { ReactElement } from 'react';
export declare const TopBar: React.ForwardRefExoticComponent<{
    onHeaderClick: () => void;
    applicationIcon: IconData | ReactElement;
    applicationName: string;
    isFetching?: boolean | undefined;
} & React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
