import React from "react";
import { Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";

import TableItem, { TableItemProps } from "./TableItem";

const { spacings } = tokens;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr 1fr;
  padding: ${spacings.comfortable.small} ${spacings.comfortable.medium};
  padding-left: 0;
  margin-bottom: ${spacings.comfortable.medium};
`;

export interface TableProps {
  title: string;
  data: TableItemProps[];
}

const Table: React.FC<TableProps> = ({ title, data }) => {
  return (
    <div>
      <Container>
        <Typography>{title}</Typography>
        <div />
        <Typography>Owner</Typography>
        <Typography>Published</Typography>
        {data[0].size && <Typography>Size</Typography>}
      </Container>
      {data.map((item, index) => (
        <TableItem key={`${title}-table-item-${index}`} {...item} />
      ))}
    </div>
  );
};

export default Table;
