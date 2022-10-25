import React from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { file, folder, link } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface GridItemProps {
  hoverable: number;
}

const GridItem = styled.div<GridItemProps>`
  display: grid;
  grid-template-columns: 4fr 2fr 1fr 1fr;
  border: 1px solid ${colors.interactive.table__header__fill_hover.hex};
  padding: ${spacings.comfortable.medium} 0;
  ${(props) =>
    props.hoverable === 1 &&
    `&:hover {
      background: ${colors.interactive.primary__hover_alt.hex};
      cursor: pointer;
    }`}
`;

const NameItem = styled.div`
  display: grid;
  grid-template-columns: 24px max-content;
  grid-gap: ${spacings.comfortable.large};
  margin-left: ${spacings.comfortable.medium};
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
`;

export interface TableItemProps {
  icon: 'Link' | 'File' | 'Folder';
  name: string;
  owner: string;
  publishedDate: string;
  size?: string;
  onClick?: () => void;
}

export const getIcon = (icon: string) => {
  switch (icon) {
    case 'Link':
      return link;
    case 'File':
      return file;
    case 'Folder':
      return folder;
  }
};

const TableItem: React.FC<TableItemProps> = ({
  icon,
  name,
  owner,
  publishedDate,
  size,
  onClick,
}) => {
  return (
    <GridItem
      hoverable={onClick ? 1 : 0}
      onClick={onClick ? onClick : undefined}
      data-testid="table-item"
    >
      <NameItem>
        <Icon data={getIcon(icon)} />
        <StyledTypography variant="h6">{name}</StyledTypography>
      </NameItem>
      <StyledTypography variant="h6">{owner}</StyledTypography>
      <StyledTypography variant="h6">{publishedDate}</StyledTypography>
      {size && <StyledTypography variant="h6">{size}</StyledTypography>}
    </GridItem>
  );
};

export default TableItem;
