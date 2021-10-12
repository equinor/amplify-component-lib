import React from "react";
import { Typography, Icon } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { IconData } from "@equinor/eds-icons";
import styled from "styled-components";

const { colors, spacings } = tokens;

interface TableRowProps {
  hoverable: number;
}

const TableRow = styled.div<TableRowProps>`
  display: flex;
  width: 100%;
  border: 1px solid ${colors.interactive.table__header__fill_hover.hex};
  padding: ${spacings.comfortable.medium} 0;
  ${(props) =>
    props.hoverable === 1 &&
    `&:hover {
      background: ${colors.interactive.primary__hover_alt.hex};
      cursor: pointer;
    }`}
`;

interface TableCellProps {
  grow: number;
}

const TableCell = styled.div<TableCellProps>`
  display: flex;
  flex-grow: ${(props) => props.grow};
`;

const StyledIcon = styled(Icon)`
  margin: 0 10px;
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
`;

interface Row {
  value: string;
  icon?: IconData;
}

export interface TableItemProps {
  data: Row[];
  grow?: number;
  onClick?: () => void;
}

const TableItem: React.FC<TableItemProps> = ({ data, grow = 1, onClick }) => {
  return (
    <TableRow hoverable={onClick ? 1 : 0} onClick={() => onClick!()}>
      {data.map((item) => (
        <TableCell grow={grow}>
          {item.icon && <StyledIcon data={item.icon} />}
          <StyledTypography variant="h6">{item.value}</StyledTypography>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableItem;
