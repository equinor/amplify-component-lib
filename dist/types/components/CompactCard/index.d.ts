import { IconData } from '@equinor/eds-icons';
import React, { ReactElement } from 'react';
export interface CompactCardProps {
    headerText: string;
    name: string;
    headerRightElement?: ReactElement;
    rightIcon?: IconData;
    className?: string;
    onClick?: React.MouseEventHandler;
}
declare const CompactCard: React.ForwardRefExoticComponent<CompactCardProps & React.RefAttributes<HTMLDivElement>>;
export default CompactCard;
