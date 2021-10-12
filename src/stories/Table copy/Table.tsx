import React from 'react';
import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import TableItem, { TableItemProps } from './TableItem';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacings.comfortable.small} 0;
  padding-left: 0;
  margin-bottom: ${spacings.comfortable.medium};
`;

interface TableHeaderProps {
  grow: number;
}

const TableHeader = styled(Typography)<TableHeaderProps>`
  font-weight: 500;
  flex-grow: ${(props) => props.grow};
`;

export interface TableProps {
  title: string;
  headers: string[];
  grow: number[];
  data: TableItemProps[];
}

const Table: React.FC<TableProps> = ({ title, grow, headers, data }) => {
  return (
    <div>
      <Container>
        {headers.map((value, index) => (
          <TableHeader key={`${value}-table-item-${index}`} grow={grow[index]}>
            {value}
          </TableHeader>
        ))}
      </Container>
      {data.map((item, index) => (
        <TableItem
          key={`${title}-table-item-${index}`}
          grow={grow[index]}
          {...item}
        />
      ))}
    </div>
  );
};

export default Table;
