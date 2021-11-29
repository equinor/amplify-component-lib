import React, { forwardRef, ReactElement, useEffect } from 'react';
import {
  Card as EDSCard,
  Icon,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const { colors, elevation } = tokens;

interface CardProps {
  onClick?: React.MouseEventHandler;
}

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

const Header = styled.div`
  display: grid;
  grid-template-columns: 80% auto;
  overflow: hidden;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface DataCardProps {
  headerText: string;
  title: string;
  rightIcon?: IconData;
  rightElement?: ReactElement;
  body?: ReactElement;
  className?: string;
  onClick?: React.MouseEventHandler;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  (
    {
      headerText,
      title,
      rightIcon,
      rightElement,
      body,
      className,
      onClick,
      onContextMenu,
    },
    ref
  ) => {
    useEffect(() => {
      if (rightIcon && rightElement)
        throw Error('Only use one; rightIcon or rightElement');
    }, [rightIcon, rightElement]);

    return (
      <Card
        ref={ref}
        className={className ?? ''}
        onClick={onClick}
        data-testid="dataCard"
        onContextMenu={(event) =>
          onContextMenu ? onContextMenu(event) : undefined
        }
      >
        <Header>
          <LeftContent>
            <Typography group="paragraph" variant="overline">
              {headerText}
            </Typography>
            <Tooltip title={title} placement="top">
              <Title variant="h6">{title}</Title>
            </Tooltip>
          </LeftContent>
          <RightContent>
            {rightIcon && (
              <Icon
                data={rightIcon}
                size={24}
                color={colors.interactive.primary__resting.hex}
              />
            )}
            {rightElement && rightElement}
          </RightContent>
        </Header>
        {body && body}
      </Card>
    );
  }
);

DataCard.displayName = 'DataCard';

export default DataCard;
