import React, { ReactElement } from 'react';
export interface DataType {
    discipline?: string;
    dataType?: string;
}
export interface DataTypeCardProps {
    headerText: string;
    title: string;
    headerRightElement?: ReactElement;
    body?: ReactElement;
    className?: string;
    onClick?: React.MouseEventHandler;
}
declare const DataCard: React.FC<DataTypeCardProps>;
export default DataCard;
