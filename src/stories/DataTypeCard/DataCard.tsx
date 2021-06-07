import { Card as EDSCard, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import React, { ReactElement } from "react";
import styled from "styled-components";

const { elevation } = tokens;

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

const DataCard: React.FC<DataTypeCardProps> = ({
  headerText,
  title,
  headerRightElement,
  body,
  className,
  onClick,
}) => (
  <Card className={className} onClick={onClick}>
    <Card.Header>
      <Card.HeaderTitle>
        <Typography group="paragraph" variant="overline">
          {headerText}
        </Typography>
        <Typography variant="h6">{title}</Typography>
      </Card.HeaderTitle>
      {headerRightElement && headerRightElement}
    </Card.Header>
    {body && body}
  </Card>
);

export default DataCard;
