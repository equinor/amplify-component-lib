import React from 'react';
export interface TableItemProps {
    icon: 'Link' | 'File' | 'Folder';
    name: string;
    owner: string;
    publishedDate: string;
    size?: string;
    onClick?: () => void;
}
declare const TableItem: React.FC<TableItemProps>;
export default TableItem;
