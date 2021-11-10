import React from 'react';
import { TableItemProps } from './TableItem';
export interface TableProps {
    title: string;
    data: TableItemProps[];
}
declare const Table: React.FC<TableProps>;
export default Table;
