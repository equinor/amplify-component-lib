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

interface DataType {
  discipline?: string;
  dataType?: string;
}

export interface DataTypeCardProps {
  datatype: DataType;
  headerRight?: ReactElement;
  body?: ReactElement;
  className?: string;
  onClick?: React.MouseEventHandler;
}

const DataTypeCard: React.FC<DataTypeCardProps> = ({
  datatype,
  headerRight,
  body,
  className,
  onClick,
}) => (
  <Card className={className} onClick={onClick}>
    <Card.Header>
      <Card.HeaderTitle>
        <Typography group="paragraph" variant="overline">
          {datatype.discipline!.toUpperCase()}
        </Typography>
        <Typography variant="h6">{datatype.dataType}</Typography>
      </Card.HeaderTitle>
      {headerRight && headerRight}
    </Card.Header>
    {body && body}
  </Card>
);

export default DataTypeCard;
