import { Card as EDSCard, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import React, { forwardRef, ReactElement } from 'react';
import styled from 'styled-components';

const { elevation, spacings } = tokens;

const Card = styled(EDSCard)<CardProps>`
  box-shadow: ${elevation.raised};
  grid-gap: 0px;
  ${(props) => {
    if (props.onClick) {
      return `&:hover {
        box-shadow: ${elevation.overlay};
        cursor: pointer;
      }`;
    }
  }}
`;

const Header = styled(Card.Header)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  & > :not(:first-child) {
    margin-left: 0 !important;
    padding: ${spacings.comfortable.small};
  }
`;

interface CardProps {
  onClick?: React.MouseEventHandler;
}

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

const DataCard = forwardRef<HTMLDivElement, DataTypeCardProps>(
  (
    { headerText, title, headerRightElement, body, className, onClick },
    ref
  ) => (
    <Card
      ref={ref}
      className={className ?? ''}
      onClick={onClick}
      data-testid="dataTypeCard"
    >
      <Header>
        <Card.HeaderTitle>
          <Typography group="paragraph" variant="overline">
            {headerText}
          </Typography>
          <Typography variant="h6">{title}</Typography>
        </Card.HeaderTitle>
        {headerRightElement && headerRightElement}
      </Header>
      {body && body}
    </Card>
  )
);

DataCard.displayName = 'DataCard';

export default DataCard;
